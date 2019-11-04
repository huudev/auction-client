import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RechareGQL, GetUserByIdGQL } from 'src/app/model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError, debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  formPending = false;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private rechargeGQL: RechareGQL,
    private getUserByIdGQL: GetUserByIdGQL
  ) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      id: ['', [Validators.required], this.userValidate.bind(this)],
      userName: [{ value: '', disabled: true }, Validators.required],
      fullName: [{ value: '', disabled: true }, Validators.required],
      currentAmount: [{ value: '', disabled: true }, Validators.required],
      change: ['0', Validators.required],
    });

    this.route.queryParams.pipe(take(1)).subscribe(parmas => {
      if (parmas.id) {
        this.userForm.get('id').setValue(parmas.id);
      }
    });
  }

  userValidate(
    idControl: AbstractControl
  ): Observable<ValidationErrors | null> {

    return this.getUserByIdGQL.fetch({ id: this.userForm.get('id').value }).pipe(debounceTime(500), map(result => {
      const user = result.data.user;
      if (!user) {
        return { userExist: true };
      }
      this.userForm.get('userName').setValue(user.userName);
      this.userForm.get('fullName').setValue(user.lastName + ' ' + user.firstName);
      this.userForm.get('currentAmount').setValue(user.amount || 0);
      return null;
    }));
  }

  submitForm() {
    this.formPending = true;

    this.rechargeGQL.mutate({
      userId: this.userForm.value.id,
      change: this.userForm.value.change
    }).subscribe(result => {
      this.formPending = false;
      if (result.data.rechare.success) {
        this.toastrService.success('Nạp thành công, số tiền mới ' + result.data.rechare.newAmount);
        this.userForm.get('currentAmount').setValue(result.data.rechare.newAmount);
      } else {
        this.toastrService.error('Có lỗi xảy ra');
      }
    });
  }


}
