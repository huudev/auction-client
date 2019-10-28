import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetAllProductExistGQL, AuctionProduct } from '../model';
import { Subscription, interval } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tool } from '../service/tool';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[];
  subscriptionTimer: Subscription;


  constructor(
    private getAllProductExsist: GetAllProductExistGQL
  ) { }

  ngOnInit() {
    this.getAllProductExsist.fetch().subscribe(
      result => {
        const currentDate = new Date();
        this.products = result.data.auctionProductsExist.map(product => {
          product['avatarUrl'] = environment.server_url + 'uploads/' + product.avatar;
          product['liveStatus'] = '';
          const endTime = new Date(product.endTime);

          return product;
        });
      }
    );

    this.subscriptionTimer = interval(1000).subscribe(() => {
      if (this.products) {
        this.products.forEach(product => {
          const currentDate = new Date();
          const startTime = new Date(product.startTime);
          const endTime = new Date(product.endTime);
          if (currentDate.getTime() < startTime.getTime()) {
            product['liveStatus'] = 0;
          } else if (currentDate.getTime() > endTime.getTime()) {
            product['liveStatus'] = 2;
          } else {
            product['liveStatus'] = 1;
          }

          if (product['liveStatus'] === 1)
            product['timer'] = Tool.getDataDiff(currentDate, endTime);

        });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionTimer.unsubscribe();
  }

}
