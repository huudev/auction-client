import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuctionProduct } from '../model';
import { Subscription, interval } from 'rxjs';
import { Tool } from '../service/tool';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, OnDestroy {
  @Input()
  products: AuctionProduct[];
  subscriptionTimer: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscriptionTimer = interval(1000).pipe(filter(() => Boolean(this.products))).subscribe(() => {
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
          product['timer'] = Tool.getDataDiff(currentDate, endTime);
        }
      });
    });
  }

  ngOnDestroy() {
    this.subscriptionTimer.unsubscribe();
  }

}
