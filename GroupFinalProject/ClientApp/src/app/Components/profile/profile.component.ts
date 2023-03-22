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
  loggedIn:boolean = false;
  weight:number=0;
  height:number=0;
  goal:string="";
  confirmation:boolean=false;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
    });
    this.getProfile(this.user.id);
  }

getProfile(userid:string):void{
  this.profileService.getProfile(this.user.id).subscribe((
    response:Profile)=>{
      this.userProfile=response;
    })
}

  addProfile(): void {
    this.userProfile.userId=this.user.id;
    this.profileService.addProfile(this.userProfile).subscribe((
      response:Profile)=>{
        this.userProfile=response;
        console.log(this.userProfile.weight);
        console.log(this.userProfile.height);
        console.log(this.userProfile.goal);
        console.log(this.user.id);
        this.getProfile(this.userProfile.userId);
      })
  }
toggleAddedUser():void{
  this.confirmation=!this.confirmation;
}


}
