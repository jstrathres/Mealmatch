import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { MealDetail } from 'src/app/Models/meal-detail';
import { MealsResult, Result } from 'src/app/Models/Meals';
import { Recipe } from 'src/app/Models/recipe';

import { NutritionDetail } from '../../Models/nutrition.details';
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
  result: MealsResult = {} as MealsResult;
  //experimental code
  result2: MealDetail = {} as MealDetail;
  detail: NutritionDetail = {} as NutritionDetail;
  user: SocialUser = {} as SocialUser;

  // boolean variables
  isFavorited: boolean[] = [];
  displayNutrients: boolean[] = [];
  loggedIn: boolean = false;
  showSearchResults: boolean = false;

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
    this.searchInput2();
    this.getFavorite();
  }

  //search bar method
  // searchInput() {
  //   this.mealService.getMeals(this.search).subscribe(
  //     (response: MealsResult) => {
  //       console.log(response);
  //       console.log(this.search);
  //       this.result = response;
  //       this.displayNutrients = new Array(response.results.length);
  //     },
  //     (error) => {
  //       console.log(error);
  //       this.status = `${this.search} not a valid input`;
  //     }
  //   );
  // }

  //Experimental Code
  searchInput2() {
    this.mealService.getMeals2(this.search).subscribe(
      (response: MealDetail) => {
        console.log(response);
        console.log(this.search);
        this.result2 = response;
        this.displayNutrients = new Array(response.results.length);
      },
      (error) => {
        console.log(error);
        this.status = `${this.search} not a valid input`;
      }
    );
  }

  // toggle methods
  toggleDisplayNutrients(index: number): void {
    this.displayNutrients[index] = !this.displayNutrients[index];
  }

  toggleFavorite(index: number): void {
    this.isFavorited[index] = !this.isFavorited[index];
  }

  // favorite methods
  // addFavorite(recipeId: number, userid: string, targetRecipe: Result): void {
  //   this.addRecipe(
  //     targetRecipe.id,
  //     targetRecipe.title,
  //     targetRecipe.image,
  //     targetRecipe.sourceUrl,
  //     targetRecipe.readyInMinutes,
  //     targetRecipe.servings
  //   );
  // }

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

  // nutrition details method
  getNutrientDetails(id: number): void {
    this.mealService.getDetails(id).subscribe((response: NutritionDetail) => {
      this.detail = response;
    });
  }

  // adds recipe to internal DB
  // TECHNICAL QUESTION!!!!!!
  addRecipe(
    recipeId: number,
    recipeTitle: string,
    image: string,
    sourceUrl: string,
    readyInMinutes: number,
    servings: number
  ): void {
    this.userService
      .addRecipe(
        recipeId,
        recipeTitle,
        image,
        sourceUrl,
        readyInMinutes,
        servings
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
