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
  weight:number=0;
  height:number=0;
  goal:string="";
  confirmation:boolean=false;
  // goaloptions:string[] = ["lose weight", "maintain weight","gain weight"];

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

getProfile():void{
  this.profileService.getProfile(this.userid).subscribe((
    response:Profile)=>{
      this.userProfile=response;
    })
}

  addProfile(): void {
    this.userProfile.userid=this.user.id;
    this.profileService.addProfile(this.userProfile).subscribe((
      response:Profile)=>{
        this.userProfile=response;
        console.log(this.userProfile.weight);
        console.log(this.userProfile.height);
        console.log(this.userProfile.goal);
        console.log(this.user.id);
        this.getProfile();
      })
  }
toggleAddedUser():void{
  this.confirmation=!this.confirmation;
}


}
