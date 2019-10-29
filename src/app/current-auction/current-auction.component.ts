import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Tool } from '../service/tool';

@Component({
  selector: 'app-current-auction',
  templateUrl: './current-auction.component.html',
  styleUrls: ['./current-auction.component.css']
})
export class CurrentAuctionComponent implements OnInit, OnDestroy {
  products: any[];
  subscriptionTimer: Subscription;

  constructor() { }

  ngOnInit() {
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
