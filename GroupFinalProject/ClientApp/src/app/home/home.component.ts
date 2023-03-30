import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private authService: SocialAuthService){}

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
      //add favorites.getfavorites to only show favorites when logged in
      //set userId to nvarcahr(max) in DB to account for long usernames
    });
  }
}
