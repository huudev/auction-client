import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { GetProductByIdGQL, AuctionProduct, SubscriptionAuctionGQL, AddAuctionGQL, AuctionHistory, GetUserByIdGQL } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { interval, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Tool } from '../service/tool';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ngValidators from '@ng-validators/ng-validators';
import { Chart } from 'chart.js';
import { DatePipe, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-auction-product',
  templateUrl: './auction-product.component.html',
  styleUrls: ['./auction-product.component.css'],
  providers: [DatePipe, CurrencyPipe]
})
export class AuctionProductComponent implements OnInit, OnDestroy, AfterContentInit {
  product: any;
  subscriptionTimer: Subscription;
  user$: BehaviorSubject<any>;
  auctionHistorys: any[] = [];
  subscriptionAuction: Subscription;
  auctionForm: FormGroup;
  barChart: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private getProductByIdGQL: GetProductByIdGQL,
    private authService: AuthService,
    private toastrService: ToastrService,
    private subscriptionAuctionGQL: SubscriptionAuctionGQL,
    private addAuction: AddAuctionGQL,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {
  }

  // get auctionHistorys() {
  //   return this._auctionHistorys;
  // }

  // set auctionHistorys(value) {
  //   this._auctionHistorys = value;
  // }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.route.paramMap.subscribe(paramMap => {
      const ownerId = paramMap.get('ownerId');
      const createTime = new Date(+paramMap.get('createTime'));

      this.getProductByIdGQL.fetch({ ownerId, createTime }, { fetchPolicy: 'network-only' }).subscribe(result => {
        this.product = result.data.auctionProduct;
        this.product['avatarUrl'] = environment.server_url + 'uploads/' + this.product.avatar;
        if (this.product.auctionHistory) {
          this.auctionHistorys = this.product.auctionHistory.reverse();
          this.updateChart();
        }
        if (!this.product.winner) {
          this.subscriptionAuction = this.subscriptionAuctionGQL
            .subscribe({
              product:
              {
                ownerId: this.product.ownerId,
                createTime: this.product.createTime,
                endTime: new Date(this.product.endTime)
              }
            })
            .subscribe(result => {
              if (result.data.auctionAdded.winner) {
                this.product.winner = result.data.auctionAdded.winner;
                this.toastrService.warning('Người chiến thắng là ' + this.product.winner);
              }
              this.auctionHistorys = result.data.auctionAdded.auctionHistory || [];
              this.auctionHistorys = this.auctionHistorys.reverse();
              this.updateChart();
            });
        } else {

        }
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
          this.subscriptionTimer.unsubscribe();
        } else {
          this.product['liveStatus'] = 1;
        }

        if (this.product['liveStatus'] === 1) {
          this.product['timer'] = Tool.getDataDiff(currentDate, endTime);
        }

      }
    });
    this.auctionForm = this.fb.group({
      auctionPrice: ['', [Validators.required, ngValidators.min(0), ngValidators.max(2000000000)]]
    });

  }

  auction() {
    const user = this.user$.value;
    if (user == null) {
      this.toastrService.error('Vui lòng đăng nhập để đấu giá');
      return;
    }
    if (this.product.auctionCondition.vipAccount && !user.vipMember) {
      this.toastrService.error('Bạn cần nâng vip để thực hiện phiên đấu giá');
      return;
    }
    const price = this.auctionForm.get('auctionPrice').value;
    if (this.auctionHistorys && this.auctionHistorys.length > 1) {
      const topPrice = this.auctionHistorys[0].price;
      if (this.product.priceStep) {
        if (price < this.product.priceStep + topPrice) {
          this.toastrService.error('Mức chênh lệch với giá cao nhất phải bằng hoặc lớn hơn ' + (this.product.priceStep + topPrice) + ' (giá cao nhất + bước giá)');
          return;
        }
      } else if (price < topPrice) {
        this.toastrService.error('Lượt đấu giá phải lớn hơn giá cao nhất hiện tại (' + topPrice + ')');
        return;
      }

    } else if (this.product.floorPrice && price < this.product.floorPrice) {
      this.toastrService.error('Lượt đấu giá phải lớn hơn giá sàn (' + this.product.floorPrice + ')');
      return;
    }

    this.addAuction.mutate({
      ownerId: this.product.ownerId,
      createTime: new Date(this.product.createTime),
      price
    })
      .subscribe(result => {
        if (result.data.auction.success) {
          this.toastrService.success(result.data.auction.message);
        } else {
          this.toastrService.error(result.data.auction.message);
        }

      });

  }

  updateChart() {
    this.barChart.data.labels.length = 0;
    this.barChart.data.datasets[0].data.length = 0;
    this.auctionHistorys.slice(0, 3).forEach(history => {
      this.barChart.data.labels.push(history.userName);
      this.barChart.data.datasets[0].data.push(history.price);
    });
    this.barChart.update();
  }

  ngAfterContentInit() {
    this.barChart = new Chart('barChart', {
      type: 'horizontalBar',
      data: {
        datasets: [{
          label: 'Người dẫn đầu',
          data: [],
          backgroundColor: [
            'rgba(255, 30, 30, 0.2)',
            'rgba(255, 255, 30, 0.2)'
          ],
          borderColor: [
            'rgba(255, 30, 30, 0.8)',
            'rgba(255, 255, 30, 0.8)'
          ],
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)'
          // ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          // yAxes: [{
          //   ticks: {
          //     beginAtZero: true
          //   }
          // }],
          xAxes: [{
            ticks: {
              callback: (label, index, labels) => {
                return this.currencyPipe.transform(label, 'VND');
              }
            },
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const history = this.auctionHistorys[tooltipItem.index];

              return this.currencyPipe.transform(tooltipItem.xLabel, 'VND') + ' ' + this.datePipe.transform(history.time, 'short');
            }
          }
        }
      }
    });

  }

  ngOnDestroy() {
    this.subscriptionTimer.unsubscribe();
    if (this.subscriptionAuction) {
      this.subscriptionAuction.unsubscribe();
    }
  }

}
