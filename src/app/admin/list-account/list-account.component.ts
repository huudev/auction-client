import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, take } from 'rxjs/operators';

import { GetAllUserGQL, User, LockUserGQL } from 'src/app/model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit, OnDestroy {
  data: Pick<User, 'id' | 'userName' | 'createTime' | 'amount'>[];
  dataSubcription: Subscription;

  constructor(
    private allUserGQL: GetAllUserGQL,
    private lockUserGQL: LockUserGQL,
    private toastrService: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.dataSubcription = this.allUserGQL.fetch({}, { fetchPolicy: 'network-only' }).pipe(take(1), map(result => {
        const users = result.data.users;
        return users.map(user => {
          user.createTime = new Date(user.createTime);
          return user;
        });
      })).subscribe(users => {
        this.data = users;
      });
    });

  }

  lockUser(id) {
    this.lockUserGQL.mutate({ id }).subscribe(result => {
      if (result.data.lockUser.success) {
        this.toastrService.success('Khóa tài khoản thành công ' + result.data.lockUser.userId);
        this.ngOnInit();
      } else {
        this.toastrService.error('Có lỗi xảy ra');
      }
    });
  }

  ngOnDestroy() {
    this.dataSubcription.unsubscribe();
  }

}
