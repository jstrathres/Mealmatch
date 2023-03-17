import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private authService: SocialAuthService){}

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
      //add favorties.getfavorites to only show favorites when logged in
      //set userId to nvarcahr(max) in DB to account for long usernames
    });
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  signOut():void {
    this.authService.signOut();
    this.loggedIn = false;
  }
}
