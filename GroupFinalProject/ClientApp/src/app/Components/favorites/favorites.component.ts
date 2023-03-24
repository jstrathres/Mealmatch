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
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  Recipes:Recipe[]=[];
  favorite:Favorite[]=[];
  
  constructor(private userService:UserService,private authService: SocialAuthService, private mealService:MealsService) { }

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
      this.userService.deleteFavorite(recipeId,this.user.id).subscribe((response:Favorite)=>{
        console.log(response);
        this.getFavorite()
      })
    }

    getFavorite():void{
      this.userService.getFavorite(this.user.id).subscribe((response:Recipe[])=>{
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