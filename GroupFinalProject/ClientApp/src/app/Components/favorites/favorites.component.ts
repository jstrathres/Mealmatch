import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
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
    private mealService: MealsService
  ) {}

  // Object variables
  Recipes: Recipe[] = [];
  favorite: Favorite[] = [];
  user: SocialUser = {} as SocialUser;
  detail: NutritionDetail = {} as NutritionDetail;

  // toggles booleans
  loggedIn: boolean = false;
  display: boolean[] = [];

  //On init Method
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
      this.getFavorite();
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

  // nutrition details method
  getDetails(id: number): void {
    this.mealService.getDetails(id).subscribe((response: NutritionDetail) => {
      this.detail = response;
    });
  }
  // toggle methods
  toggleDisplay(index: number): void {
    this.display[index] = !this.display[index];
  }
}
