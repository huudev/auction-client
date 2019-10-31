import { Component, OnInit } from '@angular/core';
import { GetAllProductCategoryGQL, ProductCategory } from '../model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories: ProductCategory[];

  constructor(private getAllCategories: GetAllProductCategoryGQL) { }

  ngOnInit() {
    this.getAllCategories.fetch().subscribe(result => {
      this.categories = result.data.productCategories;
    });
  }

}
