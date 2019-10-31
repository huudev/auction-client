import { Component, OnInit } from '@angular/core';
import { GetProductsByCategoryGQL } from '../model';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  products;

  constructor(private getProductsByCategory: GetProductsByCategoryGQL, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const categoryId = param.get('id');

      this.getProductsByCategory.fetch({ categoryId }, { fetchPolicy: 'network-only' }).subscribe(
        result => {
          this.products = result.data.auctionProductsExist.map(product => {
            product['avatarUrl'] = environment.server_url + 'uploads/' + product.avatar;
            product['liveStatus'] = '';
            return product;
          });
        }
      );
    });

  }

}
