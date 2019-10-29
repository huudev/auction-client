import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCollapse = true;
  role = {
    USERA: [
      {
        name: 'Tạo phiên đấu giá',
        route: '/create-auction'
      },
      {
        name: 'Danh sách sản phẩm của tôi',
        route: '/my-auction'
      }
    ],
    USERB: [
      {
        name: 'Danh sách phiên đấu giá của tôi',
        route: '/my-auction'
      },
    ],
    ADMIN: [
      {
        name: 'Quản trị',
        route: '/admin'
      }
    ]
  };

  currentRole = [];

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user && user.role) {
        this.currentRole = this.role[user.role];
      }
    });
  }


  tooggleMenu() {
    this.isCollapse = !this.isCollapse;
  }

}
