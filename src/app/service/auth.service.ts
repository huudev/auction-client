import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, GetAllRoleGQL, Role } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new BehaviorSubject<User>(null);
  roles: Role[];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private getRoleGQL: GetAllRoleGQL,
    private jwtHelper: JwtHelperService) {
    const token = this.getToken();
    if (token && this.jwtHelper.isTokenExpired(token)) {
      this.user$.next(this.jwtHelper.decodeToken(token));
    }
    this.getRoleGQL.fetch().subscribe(result => {
      this.roles = result.data.roles;
    });
  }

  storeToken(tokenBundle) {
    localStorage.setItem('access_token', tokenBundle.token);
    localStorage.setItem('refresh_token', tokenBundle.refreshToken);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  login() {

  }

  logout() {
    this.route.navigateByUrl('/');
  }
}
