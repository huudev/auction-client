import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetProductByIdGQL, AuctionProduct, SubscriptionAuctionGQL, AddAuctionGQL, AuctionHistory } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { interval, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Tool } from '../service/tool';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ngValidators from '@ng-validators/ng-validators';

@Component({
  selector: 'app-auction-product',
  templateUrl: './auction-product.component.html',
  styleUrls: ['./auction-product.component.css']
})
export class AuctionProductComponent implements OnInit, OnDestroy {
  product: AuctionProduct;
  subscriptionTimer: Subscription;
  user$: BehaviorSubject<any>;
  auctionHistorys: AuctionHistory[] = [];
  subscriptionAuction: Subscription;
  auctionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private getProductByIdGQL: GetProductByIdGQL,
    private authService: AuthService,
    private toastrService: ToastrService,
    private subscriptionAuctionGQL: SubscriptionAuctionGQL,
    private addAuction: AddAuctionGQL
  ) { }

  ngOnInit() {

    this.user$ = this.authService.user$;
    this.route.paramMap.subscribe(paramMap => {
      const ownerId = paramMap.get('ownerId');
      const createTime = new Date(+paramMap.get('createTime'));

      this.getProductByIdGQL.fetch({ ownerId, createTime }).subscribe(result => {
        this.product = result.data.auctionProduct;
        this.product['avatarUrl'] = environment.server_url + 'uploads/' + this.product.avatar;

        if (this.product.auctionHistory) {
          this.auctionHistorys = this.product.auctionHistory;
        }
        this.subscriptionAuction = this.subscriptionAuctionGQL
          .subscribe({ product: { ownerId: this.product.ownerId, createTime: this.product.createTime } })
          .subscribe(result => {
            this.auctionHistorys = result.data.auctionAdded.auctionHistory;
          });
      }, err => {
        this.router.navigateByUrl('/');
      });
    });

    this.subscriptionTimer = interval(1000).subscribe(() => {
      if (this.product) {

        const currentDate = new Date();
        const startTime = new Date(this.product.startTime);
        const endTime = new Date(this.product.endTime);
        if (currentDate.getTime() < startTime.getTime()) {
          this.product['liveStatus'] = 0;
        } else if (currentDate.getTime() > endTime.getTime()) {
          this.product['liveStatus'] = 2;
        } else {
          this.product['liveStatus'] = 1;
        }

        if (this.product['liveStatus'] === 1) {
          this.product['timer'] = Tool.getDataDiff(currentDate, endTime);
        }

      }
    });
    this.auctionForm = this.fb.group({
      auctionPrice: ['', [Validators.required, ngValidators.min(0)]]
    });

  }

  auction() {
    const user = this.user$.value;
    if (user == null) {
      this.toastrService.error('Vui lòng đăng nhập để đấu giá');
    } else {
      this.addAuction.mutate({
        ownerId: this.product.ownerId,
        createTime: new Date(this.product.createTime),
        price: this.auctionForm.get('auctionPrice').value
      })
        .subscribe(result => {
          if (result.data.auction.success) {
            this.toastrService.success(result.data.auction.message);
          } else {
            this.toastrService.error(result.data.auction.message);
          }

        });
    }
  }

  ngOnDestroy() {
    this.subscriptionTimer.unsubscribe();
    if (this.subscriptionAuction) {
      this.subscriptionAuction.unsubscribe();
    }
  }

}
