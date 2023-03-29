import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { Ingredient, MealDetail, Result, Step } from 'src/app/Models/meal-detail';
import { Recipe } from 'src/app/Models/recipe';
import { MealsService } from '../../Services/meals.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css'],
})
export class MealsComponent implements OnInit {
  constructor(
    private mealService: MealsService,
    private authService: SocialAuthService,
    private userService: UserService
  ) {}

  // Object variables
  Recipes: Recipe[] = [];
  detail: Result= {} as Result;
  result: MealDetail = {} as MealDetail;
  user: SocialUser = {} as SocialUser;

  // boolean variables
  isFavorited: boolean[] = [];
  loggedIn: boolean = false;

  // other variables
  search: string = '';
  status: string = '';

  // on init method
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
    });
    this.getFavorite();
  }

  //search bar method
  searchInput() {
    this.mealService.getMeals(this.search).subscribe(
      (response: MealDetail) => {
        console.log(response);
        console.log(this.search);
        this.result = response;
      },
      (error) => {
        console.log(error);
        this.status = `${this.search} not a valid input`;
      }
    );
  }

  // toggle methods

  toggleFavorite(index: number): void {
    this.isFavorited[index] = !this.isFavorited[index];
  }

  // favorite methods

  deleteFavorite(recipeid: number): void {
    this.getFavorite();
    let index = this.Recipes.findIndex((x) => x.recipeId === recipeid);
    this.userService
      .deleteFavorite(this.Recipes[index].id, this.user.id)
      .subscribe((response: Favorite) => {
        console.log(response);
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

  // adds recipe to internal DB
  addRecipe(selectedRecipe:Result): void {
    let dishTypes="";
    let caloricBreakdown=`${selectedRecipe.nutrition.caloricBreakdown.percentCarbs},${selectedRecipe.nutrition.caloricBreakdown.percentFat},${selectedRecipe.nutrition.caloricBreakdown.percentProtein}`;
    let ingredients="";
    let instructions="";
    
    selectedRecipe.dishTypes.forEach((d:string)=>console.log(d));
    selectedRecipe.dishTypes.forEach((d:string)=>dishTypes+=`${d},`);
    selectedRecipe.nutrition.ingredients.forEach((d:Ingredient)=>ingredients+=`${d.name} ${d.amount} ${d.unit},`);
    if(selectedRecipe.analyzedInstructions.length>0) {
      selectedRecipe.analyzedInstructions[0].steps.forEach((d:Step)=>instructions+=`${d.step},`);
    }
    this.userService
      .addRecipe(
        selectedRecipe.id,
        selectedRecipe.title,
        selectedRecipe.image,
        selectedRecipe.sourceUrl,
        selectedRecipe.readyInMinutes,
        selectedRecipe.servings,
        dishTypes,
        selectedRecipe.nutrition.nutrients[0].amount,
        caloricBreakdown,
        ingredients,
        instructions
      )
      .subscribe((response: Recipe) => {
        console.log(response);
        this.userService
          .addFavorite(response.id, this.user.id)
          .subscribe((response: Favorite) => {
            console.log(response);
          });
      });
  }

}
