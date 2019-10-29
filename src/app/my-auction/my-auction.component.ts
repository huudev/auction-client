import { Component, OnInit } from '@angular/core';
import { GetAllProductsGQL, GetUserByIdGQL, GetProductByIdGQL } from '../model';
import { AuthService } from '../service/auth.service';
import { environment } from 'src/environments/environment';
import { zip } from 'rxjs';

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.component.html',
  styleUrls: ['./my-auction.component.css']
})
export class MyAuctionComponent implements OnInit {
  products: any[];

  constructor(
    private getAllProducts: GetAllProductsGQL,
    private authService: AuthService,
    private getUserByIdGQL: GetUserByIdGQL,
    private getProductById: GetProductByIdGQL
  ) { }

  ngOnInit() {
    const user = this.authService.user$.value;
    if (user.role === 'USERA') {
      this.getAllProducts.fetch({ ownerId: user.id }, { fetchPolicy: 'network-only' }).subscribe(
        result => {
          this.products = result.data.auctionProducts.map(product => {
            product['avatarUrl'] = environment.server_url + 'uploads/' + product.avatar;
            product['liveStatus'] = '';
            return product;
          });
        }
      );
    } else if (user.role === 'USERB') {
      this.getUserByIdGQL.fetch({ id: user.id }, { fetchPolicy: 'network-only' }).subscribe(result => {
        if (result.data.user.products) {
          const productsObservable = result.data.user.products.map(product => {
            return this.getProductById.fetch({ ownerId: product.ownerId, createTime: product.createTime });
          });
          zip(...productsObservable).subscribe(rs => {
            this.products = rs.map(e => {
              const p = e.data.auctionProduct;
              p['avatarUrl'] = environment.server_url + 'uploads/' + p.avatar;
              return p;
            });
          });
        }
      });
    } else {
      return;
    }
  }

}
