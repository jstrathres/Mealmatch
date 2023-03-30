import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'oidc-client';
import { Favorite } from 'src/app/Models/favorite';
import { MealPlan } from 'src/app/Models/meal-plan';
import { Recipe } from 'src/app/Models/recipe';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: SocialAuthService,
   
  ) {}

  // Object variables
  Recipes: Recipe[] = [];
  favorite: Favorite[] = [];
  user: SocialUser = {} as SocialUser;
  userProfile: Profile = {} as Profile;
  mealPlan: MealPlan = {} as MealPlan;
  date:Date = {} as Date;
  
  // toggles booleans
  loggedIn: boolean = false;
  displayDate: boolean[] = [];
  doesProfileExist:boolean=false;

  //On init Method
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
      this.getFavorite();
      this.getProfile();
    });
  }

  // favorite methods
  deleteFavorite(recipeId: number): void {
    this.userService
      .deleteFavorite(recipeId, this.user.id)
      .subscribe((response: Favorite) => {
        console.log(response);
        this.getFavorite();
      });
  }

  getFavorite(): void {
    this.userService
      .getFavorite(this.user.id)
      .subscribe((response: Recipe[]) => {
        console.log(response);
        this.Recipes = response;
      });
  }

  // profile methods
  getProfile():void{
    this.userService.getProfile(this.user.id)
    .subscribe((response: Profile)=>{
      console.log(response);
      if (response) {
        this.userProfile = response;
      }
      this.profileExists();
    });
  }

  profileExists(): void {
    if (!this.userProfile.goal) {
      this.doesProfileExist = false;
    } else {
      this.doesProfileExist = true;
    }
  }

  // goal methods

  mealQuota(cal:number){
    // console.log(cal);
    let daily:number=(this.userProfile.weight*10)+500;
    // console.log(daily);
    let dailyCalGoal:number=0
    // console.log(this.userProfile.goal);
    // console.log(this.userProfile.weight);
    // console.log(this.user.id);
    if(this.userProfile.goal=="lose weight"){
      dailyCalGoal = daily - 500;
    }
    else if(this.userProfile.goal=="gain weight"){
      dailyCalGoal = daily + 500;
    }
    else{
      dailyCalGoal = daily;
    }
    // console.log(dailyCalGoal);
    let calorieSurplus:number= (cal)*2 - (dailyCalGoal/3);
    // console.log(calorieSurplus);
    let minutesOfExercise:number=((calorieSurplus/300)*60);
    // console.log(minutesOfExercise);
    let goal:number = Number((minutesOfExercise).toFixed(0));
    if(goal>0){
      return `${goal} minutes of moderate intensity exercise (e.g., brisk walk).`;
    }
    else{
      return 'No exercise needed!'
    }
    
  }

  // mealplan methods
  addMealPlan(recipeId:number):void{
    if(Object.keys(this.date).length===0){
      console.log('left');
      return;
    }
    console.log('right');
    this.userService.addMealPlan(this.user.id,recipeId,this.date).subscribe((
      response:MealPlan) =>{
        this.mealPlan = response;
        console.log(response);
        console.log(this.date);
        this.date = {} as Date;
      }
      );
  }
  
  toggleDate(index: number): void {
    this.displayDate[index] = !this.displayDate[index];
  }
}
