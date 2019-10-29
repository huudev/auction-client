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
export class HomeComponent implements OnInit {
  products: any[];
  subscriptionTimer: Subscription;


  constructor(
    private getAllProductExsist: GetAllProductExistGQL
  ) { }

  ngOnInit() {
    this.getAllProductExsist.fetch({}, { fetchPolicy: 'network-only' }).subscribe(
      result => {
        this.products = result.data.auctionProductsExist.map(product => {
          product['avatarUrl'] = environment.server_url + 'uploads/' + product.avatar;
          product['liveStatus'] = '';
          return product;
        });
      }
    );
  }


}
