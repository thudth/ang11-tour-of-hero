import {Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login/entities/social-user';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit {
  socialUsers: SocialUser;

  constructor(
    private socialAuthService: SocialAuthService
  ) {
  }

  ngOnInit(): void {
    this.authState();
    this.socialAuthService.initState.subscribe((state: boolean) => {
    });
    console.log(sessionStorage.length);
  }

  authState(): void {
    this.socialAuthService.authState.subscribe((u: SocialUser) => {
      this.socialUsers = u;
      console.log(u);
    });
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((u: SocialUser) => {
      console.log('gg login successful', u);
    });
  }

  signOut(): void {
    this.socialAuthService.signOut().then(v => {
      console.log(v);
    });
  }
}
