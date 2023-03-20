import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { Recipe } from 'src/app/Models/recipe';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  Recipes:Recipe[]=[];
  favorite:Favorite[]=[];
  
  constructor(private recipeService:RecipeService) { }

  userId:string="";

  ngOnInit():void {

    }

    deleteFavorite(recipeId:number):void{
      this.recipeService.deleteFavorite(recipeId,this.userId).subscribe((response:Favorite)=>{
        console.log(response);
        this.getFavorite()
      })
    }
    getFavorite():void{
      this.recipeService.getFavorite(this.userId).subscribe((response:Recipe[])=>{
        console.log(response);
        this.favorite = response;
      })
    }
    getRecipe():void{
      this.recipeService.getRecipe().subscribe((response:Recipe[])=>{
        console.log(response);
        this.Recipes = response;
      })
    }
    

  }

