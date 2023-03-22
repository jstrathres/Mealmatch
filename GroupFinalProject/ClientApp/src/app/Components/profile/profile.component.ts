import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'oidc-client';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile:Profile = {} as Profile;

  constructor(private profileService:RecipeService, private authService:SocialAuthService,) { }

  user: SocialUser = {} as SocialUser;
  userid:string = this.user.id;
  loggedIn:boolean = false;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
    });
    this.profileService.getProfile(this.userid).subscribe((
      response:Profile)=>{
        this.userProfile=response;
      })
  }

  addProfile(weight:number, height:number, goal:string): void {
    this.profileService.addProfile(this.userid, weight, height, goal).subscribe((
      response:Profile)=>{
        this.userProfile=response;
      })
  }



}
