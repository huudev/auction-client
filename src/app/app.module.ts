import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { Apollo } from 'apollo-angular';
import { split } from 'apollo-link';
import { JwtModule } from '@auth0/angular-jwt';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuctionProductComponent } from './auction-product/auction-product.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    AuctionProductComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    CarouselComponent,
    CreateAuctionComponent,
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        },
        whitelistedDomains: ['localhost:4200', 'localhost:3000'],
        blacklistedRoutes: ['example.com/examplebadroute/'],
      }
    })
  ],
  // providers: [{
  //   provide: APOLLO_OPTIONS,
  //   useFactory: (httpLink: HttpLink) => {
  //     return {
  //       cache: new InMemoryCache(),
  //       link: httpLink.create({
  //         uri: 'http://localhost:3000/graphql'
  //       })
  //     };
  //   },
  //   deps: [HttpLink]
  // }],
  // providers: [
  //   { provide: LOCALE_ID, useValue: "vi" }, //your locale
  // ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // Create an http link:
    const http = httpLink.create({
      uri: 'http://localhost:3000/graphql'
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: `ws://localhost:3000/graphql`,
      options: {
        reconnect: true
      }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
      // split based on operation type
      ({ query }) => {
        // let operation: OperationDefinitionNode = getMainDefinition(query);
        const { kind, operation } = getMainDefinition(query) as any;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http,
    );

    apollo.create({
      link,
      cache: new InMemoryCache()
    } as any);
  }
}
