import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetAllProductCategoryGQL } from '../model';
import { AuthService } from '../service/auth.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private getAll: GetAllProductCategoryGQL,
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      avatar: ['', Validators.required],
      floorPrice: ['', Validators.required],
      ceilingPrice: ['', Validators.required],
      stepPrice: ['', Validators.required],
      auctionCondition: this.fb.group({
        vipAccount: [''],
        accountActiveDay: ['']
      }),
      auctionType: ['', Validators.required],
      productCategory: ['', Validators.required]
    });
  }

  submitForm(){
    console.log(this.productForm.value);
    
  }

}
