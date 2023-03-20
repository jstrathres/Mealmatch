import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Favorite } from 'src/app/Models/favorite';
import { MealsResult } from 'src/app/Models/Meals';
import { Recipe } from 'src/app/Models/recipe';
import { MealsService } from 'src/app/Services/meals.service';
import { RecipeService } from 'src/app/Services/recipe.service';
import { NutritionDetail } from '../../Models/nutrition.details';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  Recipes:Recipe[]=[];
  constructor(private mealService:MealsService, private route:ActivatedRoute,private recipeService:RecipeService) { }

  // result:MealsModel[] = [];
  result:MealsResult = {} as MealsResult;
  search:string="";
  status:string="";
  detail:NutritionDetail = {} as NutritionDetail;
  display:boolean[]=[];
  id:number=0;
  recipeTitle:string="";
  readyInMinutes:number=0;
  servings:number=0;
  sourceUrl:string="";
  image:string="";
  user: SocialUser = {} as SocialUser;
  userid:string = this.user.id;
  

  ngOnInit() {
    this.searchInput();
    }
    
    searchInput(){
    this.mealService.getMeals(this.search).subscribe((response:MealsResult)=>{
      console.log(response);
      console.log(this.search);
      // this.result = response.results;
      this.result = response;
      this.display=new Array(response.results.length);

    },
    (error)=>{
      console.log(error)
      this.status= `${this.search} not a valid input`
    }

    );
    
    }
    toggleDisplay(index:number):void {
      this.display[index]=!this.display[index];
    }

    getDetails(id:number):void {
      this.mealService.getDetails(id).subscribe((response:NutritionDetail)=>{
        this.detail=response;
    })       
         
    }
    addFavorite(recipeId:number):void{

      this.recipeService.addFavorite(recipeId, this.user.id).subscribe((response:Favorite)=>{
        console.log(response);
      })
    }

    addRecipe(recipeId:number, recipeTitle:string, readyInMinutes:number, servings:number, sourceUrl:string, image:string):void{

      this.recipeService.addRecipe(recipeId,recipeTitle, readyInMinutes, servings, sourceUrl, image).subscribe((response:Recipe)=>{
        console.log(response);
      })
    }


}
