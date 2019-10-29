import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGQL } from '../model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscription: Subscription;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private logingGQL: LoginGQL,
    private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {

    this.subscription = this.logingGQL.fetch({ ...this.loginForm.value }, { fetchPolicy: 'network-only' }).subscribe(result => {
      const data = result.data.login;
      if (!data.token) {
        this.toastrService.error('Tài khoản hoặc mật khẩu không đúng');
      } else {
        this.authService.user$.next(this.jwtHelper.decodeToken(result.data.login.token));
        this.authService.storeToken(data);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
      }
    });
  }

}
