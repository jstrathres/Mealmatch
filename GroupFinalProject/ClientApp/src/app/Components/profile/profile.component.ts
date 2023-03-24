import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'oidc-client';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService, private authService:SocialAuthService,) { }

  // Object variables
  userProfile:Profile = {} as Profile;
  user: SocialUser = {} as SocialUser;

  // Toggle booleans
  loggedIn:boolean = false;
  confirmation:boolean=false;
  profile:boolean=false;
  update:boolean=false

  //On init method
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      this.getProfile();
    });
  }

  // Profile methods
  getProfile():void{
  this.userService.getProfile(this.user.id).subscribe((
  response:Profile)=>{
      console.log(response);
        if(response){
          this.userProfile=response;
        }
      this.profileExists();
    })
  }

  addProfile(): void {
    this.userProfile.userId=this.user.id;
    this.userService.addProfile(this.userProfile).subscribe((
      response:Profile)=>{
        this.userProfile=response;
        console.log(this.userProfile);
        this.getProfile();
      })
  }

  deleteProfile():void{
    this.userProfile.userId=this.user.id;
    this.userService.deleteProfile(this.userProfile.userId).subscribe((
      response:Profile)=>{
        this.userProfile={} as Profile;
        this.profile=false;
        this.confirmation=false;
      })
  }

  profileExists():void{
    if(!this.userProfile.goal)
    {
      this.profile=false;
    }
    else{
      this.profile=true;
    }
  }

  updateProfile():void{
    this.userProfile.userId=this.user.id;
    this.userService.updateProfile(this.userProfile.userId,this.userProfile.weight,this.userProfile.goal).subscribe((
      response:Profile)=>{
        this.userProfile=response;
        console.log(this.userProfile);
        console.log(this.user.id);
        this.getProfile();
      })
  }

  // Toggle methods
  toggleAddedUser():void{
    this.confirmation=!this.confirmation;
  }

  toggleUpdate(){
    this.update = !this.update;
  }

  // Math methods
  heightMath(){
    let feet:number = Number(Math.floor(this.userProfile.height/12));
    let inches:number = Number(this.userProfile.height - (feet*12)); 
    return `${feet}' ${inches}"`
  }

}
