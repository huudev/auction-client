import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserGQL, UpdateUserGQL, GetUserByIdGQL } from 'src/app/model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs/operators';
import { maxDate } from '@ng-validators/ng-validators';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css'],
  providers: [DatePipe]
})
export class CardUserComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('create') createUser = true;

  formPending = false;
  userForm: FormGroup;
  enableIdInput = false;
  id: string;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private addUserGQL: AddUserGQL,
    private updateUserGQL: UpdateUserGQL,
    private getUserByIdGQL: GetUserByIdGQL,
    private toastrService: ToastrService) { }

  ngOnInit() {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{5,21}')]],
      password: ['', [Validators.required, Validators.pattern('.{8,}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$')]],
      firstName: ['',[Validators.required, Validators.pattern('^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$')]],
      address: ['', Validators.required],
      birthday: ['', [Validators.required, maxDate(date)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('0[0-9\s.-]{9,13}')]],
      email: ['', [Validators.required, Validators.pattern('^[a-z][a-z0-9_\.]+@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,}$')]],
      role: ['USERB', Validators.required]
    });
    if (!this.createUser) {
      this.route.paramMap.subscribe(param => {
        this.id = param.get('id');
        this.userForm.addControl('id', this.fb.control({ value: this.id, disabled: true }));
        this.enableIdInput = true;
        this.getUserByIdGQL.fetch({ id: this.id }).subscribe(result => {
          result.data.user.birthday = this.datePipe.transform(result.data.user.birthday, 'yyyy-MM-dd');
          this.userForm.patchValue(result.data.user);
        });
        this.userForm.get('password').disable();
        this.userForm.get('userName').disable();
        this.userForm.get('role').disable();
      });
    }
  }

  submitForm() {
    if (this.createUser) {
      this.addUser();
    } else {
      this.updateUser();
    }
  }

  addUser() {
    this.formPending = true;
    const birthday: Date = new Date(this.userForm.value.birthday);
    const user = {
      ...this.userForm.value, birthday
    };
    this.addUserGQL.mutate({
      user
    }).subscribe(result => {
      this.formPending = false;
      if (result.data.addUser.success) {
        this.toastrService.success('Tạo thành công ' + result.data.addUser.user.id);
        this.route.queryParamMap.pipe(take(1)).subscribe(paramMap => {
          this.router.navigateByUrl(paramMap.get('returnUrl') || '');
        });
      } else {
        this.toastrService.error('Có lỗi xảy ra');
      }
    });
  }

  updateUser() {
    this.formPending = true;
    const birthday: Date = new Date(this.userForm.value.birthday);
    const user = {
      ...this.userForm.value, birthday, id: this.id
    };
    this.updateUserGQL.mutate({
      user
    }).subscribe(result => {
      this.formPending = false;
      if (result.data.updateUser.success) {
        this.toastrService.success('Cập nhật thành công ' + result.data.updateUser.user.id);
      } else {
        this.toastrService.error('Có lỗi xảy ra');
      }
    });
  }
  
}
