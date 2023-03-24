import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { MealsResult, Result } from 'src/app/Models/Meals';
import { Recipe } from 'src/app/Models/recipe';

import { NutritionDetail } from '../../Models/nutrition.details';
import { MealsService } from '../../Services/meals.service';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  Recipes:Recipe[]=[];
  constructor(private mealService:MealsService, private authService: SocialAuthService,private userService:UserService) { }

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
  loggedIn:boolean = false;
  isFavorited:boolean[]=[];
  results:boolean=false;

  

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
    });
    this.searchInput();
    this.getFavorite();
    };
    
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

    toggleFavorite(index:number):void {
    this.isFavorited[index]=!this.isFavorited[index];
    }

    getDetails(id:number):void {
      this.mealService.getDetails(id).subscribe((response:NutritionDetail)=>{
        this.detail=response;
    })       
         
    }
    addFavorite(recipeId:number, userid:string, targetRecipe:Result):void{
      this.addRecipe(targetRecipe.id, targetRecipe.title, targetRecipe.image, targetRecipe.sourceUrl, targetRecipe.readyInMinutes, targetRecipe.servings);
    }

    deleteFavorite(recipeid:number):void{
      this.getFavorite();
      let index = this.Recipes.findIndex(x => x.recipeId === recipeid);
      console.log(recipeid)
      console.log(this.Recipes)
      console.log(index);
      this.userService.deleteFavorite(this.Recipes[index].id,this.user.id).subscribe((response:Favorite)=>{
        console.log(response);
      })
    }

    getFavorite():void{
      this.userService.getFavorite(this.user.id).subscribe((response:Recipe[])=>{
        console.log(response);
        this.Recipes = response;
      })
    }

    addRecipe(recipeId:number, recipeTitle:string, image:string, sourceUrl:string, readyInMinutes:number, servings:number):void{

      this.userService.addRecipe(recipeId,recipeTitle, image, sourceUrl, readyInMinutes, servings).subscribe((response:Recipe)=>{
        console.log(response);
        this.userService.addFavorite(response.id, this.user.id).subscribe((response:Favorite)=>{
          console.log(response);
          console.log(this.userid);
          console.log(this.user.id)
        })
      })
    }

}
