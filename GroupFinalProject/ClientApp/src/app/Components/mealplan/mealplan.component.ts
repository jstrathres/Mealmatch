import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MealPlan } from 'src/app/Models/meal-plan';
import { MealPlanView } from 'src/app/Models/meal-plan-view';
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
  mealplans: MealPlan[]=[];
  mealplanviews: MealPlanView[]=[];

  // boolean variables
  loggedIn: boolean = false;
  displaysIngredients:boolean[]=[];
  displaysInstructions:boolean[]=[];

  //other variables
  ingredientsArray:Array<string>=[];
  instructionsArray:Array<string>=[];
  selectedDate: Date=new Date();

  constructor(private userService: UserService, private authService:SocialAuthService) { }

  // ng On init
ngOnInit(): void {
 this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
      this.getMeals();
      this.getMealPlanView();
    });
  }
  
// mealplan methods
getMeals():void{
  this.userService.getMeals(this.user.id).subscribe((response:Recipe[])=>{
    this.meals = response
    console.log(response)
  });  
}

getAllMeals():void{
  this.userService.getAllMeals(this.user.id).subscribe((response:MealPlan[])=>{
    this.mealplans = response
    console.log(response)
  });  
}

getMealPlanView():void{
  this.userService.getMealPlanView(this.user.id).subscribe((response:MealPlanView[])=>{
    this.mealplanviews = response
    console.log(response)
  });  
}

matchingMeals():MealPlanView[]{
  return this.mealplanviews.filter((mpv:MealPlanView)=>
  mpv.date.toString().substring(0,mpv.date.toString().indexOf('T'))===this.selectedDate.toString())
}

stringConverterIngredients(ingString:string):void{
  this.ingredientsArray=ingString.split(",");
}

stringConverterInstructions(instrString:string):void{
  this.instructionsArray=instrString.substring(0,instrString.length-1).split(".,");

}

deleteMealPlan(recipeId:number):void{
    this.userService.deleteMealPlan(this.user.id,recipeId).subscribe((response:MealPlan)=>{
      console.log(response);
      this.getMeals();
      this.getAllMeals();
    })
  }

  toggleIngredients(index: number): void {
    this.displaysIngredients[index] = !this.displaysIngredients[index];
  }

  toggleInstructions(index: number): void {
    this.displaysInstructions[index] = !this.displaysInstructions[index];
  }

}
