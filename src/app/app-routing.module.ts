import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AuctionProductComponent } from './auction-product/auction-product.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { AuthAdminGuardService } from './service/auth-admin-guard.service';
import { CurrentAuctionComponent } from './current-auction/current-auction.component';
import { MyAuctionComponent } from './my-auction/my-auction.component';
import { UserInfomationComponent } from './user-infomation/user-infomation.component'

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', component: HomeComponent, pathMatch: 'full'
      },
      {
        path: 'auction-product/:ownerId/:createTime', component: AuctionProductComponent
      },
      {
        path: 'create-auction', component: CreateAuctionComponent
      },
      {
        path: 'current-auction', component: CurrentAuctionComponent
      },
      {
        path: 'my-auction', component: MyAuctionComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'sign-up', component: SignUpComponent
      },
      {
        path: 'user-information', component: UserInfomationComponent
      }
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
