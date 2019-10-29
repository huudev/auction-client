import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListAccountComponent } from './list-account/list-account.component';
import { AccountComponent } from './account/account.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { RechargeComponent } from './recharge/recharge.component';
import { UserComponent } from './user/user.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


@NgModule({
  declarations: [DashboardComponent, ListAccountComponent, AccountComponent,
    NavBarComponent, LayoutComponent, RechargeComponent, UserComponent],
  imports: [
    SharedModule,
    Ng2GoogleChartsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
