import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {HeroDetailComponent} from './main/hero-detail/hero-detail.component';
import {HeroesComponent} from './main/heroes/heroes.component';
import {MessagesComponent} from './main/messages/messages.component';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {HeroSearchComponent} from './main/hero-search/hero-search.component';
import {GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleAuthComponent} from './google-auth/google-auth.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    GoogleAuthComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.clientId)
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class AppModule {
}
