import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'oidc-client';
import { Favorite } from 'src/app/Models/favorite';
import { MealPlan } from 'src/app/Models/meal-plan';
import { Recipe } from 'src/app/Models/recipe';
import { NutritionDetail } from '../../Models/nutrition.details';
import { MealsService } from '../../Services/meals.service';
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
    private mealService: MealsService,
   
  ) {}

  // Object variables
  Recipes: Recipe[] = [];
  favorite: Favorite[] = [];
  user: SocialUser = {} as SocialUser;
  detail: NutritionDetail = {} as NutritionDetail;
  userProfile: Profile = {} as Profile;
  mealPlan: MealPlan = {} as MealPlan;
  date:Date = {} as Date;
  

  // toggles booleans
  loggedIn: boolean = false;
  displayDate: boolean[] = [];

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

  getProfile():void{
    this.userService.getProfile(this.user.id)
    .subscribe((response: Profile)=>{
      this.userProfile=response;
    })
  }

  // nutrition details method
  // getDetails(id: number): void {
  //   this.mealService.getDetails(id).subscribe((response: NutritionDetail) => {
  //     this.detail = response;
  //   });
  // }
  // toggle methods
  // toggleDisplayNutrients(index: number): void {
  //   this.displayNutrients[index] = !this.displayNutrients[index];
  // }

  mealQuota(cal:number){
    console.log(cal);
    let daily:number=(this.userProfile.weight*10)+500;
    console.log(daily);
    let dailyCalGoal:number=0
    console.log(this.userProfile.goal);
    console.log(this.userProfile.weight);
    console.log(this.user.id);
    if(this.userProfile.goal=="Lose Weight"){
      dailyCalGoal = daily - 500;
    }
    else if(this.userProfile.goal=="Gain Weight"){
      dailyCalGoal = daily + 500;
    }
    else{
      dailyCalGoal = daily;
    }
    console.log(dailyCalGoal);
    let calorieSurplus:number= (cal)*2 - (dailyCalGoal/3);
    console.log(calorieSurplus);
    let minutesOfExercise:number=((calorieSurplus/300)*60);
    console.log(minutesOfExercise);
    let goal:number = Number((minutesOfExercise).toFixed(0));
    if(goal>0){
      return `${goal} minutes of moderate intensity exercise (e.g., brisk walk).`;
    }
    else{
      return 'No exercise needed!'
    }
    
  }
  addMealPlan(recipeId:number):void{
    this.userService.addMealPlan(this.user.id,recipeId,this.date).subscribe((
      response:MealPlan) =>{
        this.mealPlan = response;
        console.log(response)
      }
      );
  }
  toggleDate(index: number): void {
    this.displayDate[index] = !this.displayDate[index];
  }


}
