import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { GetUserByIdGQL, UpdateUserGQL } from '../model';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private auth: AuthService,
    private getUserByIdGQL: GetUserByIdGQL,
    private updateUserGQL: UpdateUserGQL,
    private toastrService: ToastrService) { }

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

  upgradeVipmember() {
    const user = this.auth.user$.value;
    this.getUserByIdGQL.fetch({ id: user.id }, { fetchPolicy: 'network-only' }).subscribe(rs => {
      const user = rs.data.user;
      if (user.vipMember) {
        this.toastrService.info('Bạn đã là thành viên vip, nếu chưa dùng được chức năng vip vui lòng đăng nhập lại');
        return;
      }

      if (user.amount < 15000) {
        this.toastrService.info('Hiện tại bạn chỉ có ' + user.amount + ' nên không thể nâng vip');
        this.toastrService.info('Vui lòng liên lạc admin để được nạp tiền');
        return;
      }
      this.updateUserGQL.mutate({ user: { id: user.id, vipMember: true, amount: user.amount - 15000 } }).subscribe(result => {
        if (result.data.updateUser.success) {
          this.toastrService.success('Nâng cấp vip thành công, vui lòng đăng nhập lại để dùng được chức năng vip');
        } else {
          this.toastrService.error('Có lỗi xảy ra');
        }
      });
    });
  }

}
