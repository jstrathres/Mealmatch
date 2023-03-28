import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MealPlan } from 'src/app/Models/meal-plan';
import { Recipe } from 'src/app/Models/recipe';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})
export class MealplanComponent implements OnInit {

  // object variables
  user: SocialUser = {} as SocialUser;
  mealPlan:MealPlan = {} as MealPlan;
  meals: Recipe[] = [];

  // boolean variables
  loggedIn: boolean = false;

  constructor(private userService: UserService, private authService:SocialAuthService) { }

  // ng On init
ngOnInit(): void {
 this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
      this.getMeals();
    });
  }
  
// mealplan methods
getMeals():void{
  this.userService.getMeals(this.user.id).subscribe((response:Recipe[])=>{
    this.meals = response
    console.log(response)
  });  

}

deleteMealPlan(recipeId:number):void{
    this.userService.deleteMealPlan(this.user.id,recipeId).subscribe((response:MealPlan)=>{
      console.log(response)
      this.getMeals();
    })
  }
  
}
