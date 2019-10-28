import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { GetAllProductCategoryGQL, AddProductGQL, ProductCategory, GetAllAuctionTypeGQL, AuctionType } from '../model';
import * as ngValidators from '@ng-validators/ng-validators';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  productForm: FormGroup;
  categories: ProductCategory[];
  auctionTypes: AuctionType[];
  avatarControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private getAllCategories: GetAllProductCategoryGQL,
    private getAllAuctionType: GetAllAuctionTypeGQL,
    private addProductGQL: AddProductGQL,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      startTime: ['', [Validators.required, ngValidators.minDate(new Date())]],
      endTime: ['', [Validators.required, ngValidators.minDate(new Date()), this.endTimeValidate]],
      avatar: ['', Validators.required],
      floorPrice: ['', ngValidators.gt(0)],
      ceilingPrice: ['', ngValidators.gt(0)],
      stepPrice: ['', ngValidators.gt(0)],
      auctionCondition: this.fb.group({
        vipAccount: [false],
        accountActiveDay: ['', ngValidators.gt(0)],
      }),
      auctionType: ['', Validators.required],
      productCategory: ['', Validators.required]
    }, {
      validators: this.formValidate
    });

    this.avatarControl = this.fb.control(['']);

    this.getAllCategories.fetch().subscribe(result => {
      this.categories = result.data.productCategories;
    });

    this.getAllAuctionType.fetch().subscribe(result => {
      this.auctionTypes = result.data.auctionTypes;
    });
  }


  endTimeValidate(endTimeControl: AbstractControl): ValidationErrors | null {
    const parent = endTimeControl.parent;
    if (parent) {
      const endTime = new Date(endTimeControl.value);
      const startTime = new Date(parent.get('startTime').value);
      if (endTime.getTime() < startTime.getTime()) {
        return { bad: true };
      }
    }


    return null;
  }


  formValidate(g: FormGroup) {

    if (g.get('productName').valid && g.get('description').valid) {

      return;
    }
  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadImage(file);
    }
  }

  uploadImage(images: File) {
    const formData = new FormData();
    formData.append('file', images);
    this.http.post('http://localhost:3000/file', formData)
      .subscribe(
        res => {
          this.toastrService.success('Thêm hình thành công');
          this.productForm.get('avatar').setValue(res['filename']);
        },
        err => {
          this.toastrService.error('Có lỗi xảy ra không thể upload hình');
        }
      );
  }

  submitForm() {
    const product = this.productForm.value;
    for (const key in product) {
      if (typeof product[key] === 'object') {
        for (const sub in product[key]) {
          if (product[key][sub] === '') {
            delete product[key][sub];
          }
        }
      } else if (product[key] === '') {
        delete product[key];
      }
    }

    this.addProductGQL.mutate({ product }).subscribe(
      res => {
        this.toastrService.success('Đăng sản phẩm đấu giá thành công');
        this.router.navigateByUrl('/');
      },
      err => {
        this.toastrService.error('Có lỗi xảy ra');
      }
    );

  }


}
