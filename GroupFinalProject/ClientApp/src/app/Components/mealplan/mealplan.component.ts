import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'oidc-client';
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
  userProfile:Profile = {} as Profile;

  // boolean variables
  loggedIn: boolean = false;
  displaysIngredients:boolean[]=[];
  displaysInstructions:boolean[]=[];
  doesProfileExist:boolean=false;

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
      // this.getMeals();
      this.getMealPlanView();
      this.getProfile();
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

// meal methods

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
  this.ingredientsArray=ingString.substring(0,ingString.length-1).split(",");
}

stringConverterInstructions(instrString:string):void{
  this.instructionsArray=instrString.substring(0,instrString.length-1).split(".,");

}

deleteMealPlan(id:number):void{
    this.userService.deleteMealPlan(this.user.id,id).subscribe((response:MealPlan)=>{
      console.log(response);
      this.getMealPlanView();
    })
  }

  toggleIngredients(index: number): void {
    this.displaysIngredients[index] = !this.displaysIngredients[index];
  }

  toggleInstructions(index: number): void {
    this.displaysInstructions[index] = !this.displaysInstructions[index];
  }

  // goal methods

  mealQuota(cal:number){
    let daily:number=(this.userProfile.weight*10)+500;
    let dailyCalGoal:number=0
    if(this.userProfile.goal=="lose weight"){
      dailyCalGoal = daily - 500;
    }
    else if(this.userProfile.goal=="gain weight"){
      dailyCalGoal = daily + 500;
    }
    else{
      dailyCalGoal = daily;
    }
    let calorieSurplus:number= (cal)*2 - (dailyCalGoal/3);
    let minutesOfExercise:number=((calorieSurplus/300)*60);
    let goal:number = Number((minutesOfExercise).toFixed(0));
    let hiGoal:number = Number(((minutesOfExercise)/3).toFixed(0))
    if(goal>0){
      return `${goal} minutes of moderate intensity exercise (e.g., brisk walk) or ${hiGoal} minutes of high intensity exercise (e.g., run or weightlifting).`;
    }
    else{
      return 'No exercise needed!'
    } 
  }

}
