import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { Recipe } from 'src/app/Models/recipe';
import { RecipeService } from 'src/app/Services/recipe.service';
import { NutritionDetail } from '../../Models/nutrition.details';
import { MealsService } from '../../Services/meals.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  Recipes:Recipe[]=[];
  favorite:Favorite[]=[];
  
  constructor(private recipeService:RecipeService,private authService: SocialAuthService, private mealService:MealsService) { }

  userId:string="";
  loggedIn:boolean = false;
  user: SocialUser = {} as SocialUser;
  detail:NutritionDetail = {} as NutritionDetail;
  display: boolean[]=[];

  ngOnInit():void {
    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
    this.getFavorite();

    });
    }

    deleteFavorite(recipeId:number):void{
      this.recipeService.deleteFavorite(recipeId,this.user.id).subscribe((response:Favorite)=>{
        console.log(response);
        this.getFavorite()
      })
    }
    getFavorite():void{
      this.recipeService.getFavorite(this.user.id).subscribe((response:Recipe[])=>{
        console.log(response);
        this.Recipes = response;
      })
    }
    getRecipe():void{
      this.recipeService.getRecipe().subscribe((response:Recipe[])=>{
        console.log(response);
        this.Recipes = response;
      })
    }

    
    getDetails(id:number):void {
      this.mealService.getDetails(id).subscribe((response:NutritionDetail)=>{
        this.detail=response;
    })  
  }
    toggleDisplay(index:number):void {
      this.display[index]=!this.display[index];
    }

  
  }
