import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListAccountComponent } from './list-account/list-account.component';
import { AccountComponent } from './account/account.component';
import { LayoutComponent } from './layout/layout.component';
import { RechargeComponent } from './recharge/recharge.component';
import { UserComponent } from './user/user.component';


export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', component: DashboardComponent, pathMatch: 'full'
      },
      {
        path: 'list-account', component: ListAccountComponent
      },
      {
        path: 'account/:id', component: AccountComponent
      },
      {
        path: 'recharge', component: RechargeComponent
      },
      {
        path: 'newuser', component: UserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
