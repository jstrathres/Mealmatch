import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Favorite } from 'src/app/Models/favorite';
import { MealsResult } from 'src/app/Models/Meals';
import { Recipe } from 'src/app/Models/recipe';
import { MealsService } from 'src/app/Services/meals.service';
import { NutritionDetail } from '../../Models/nutrition.details';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  Recipes:Recipe[]=[];
  constructor(private mealService:MealsService, private route:ActivatedRoute) { }

  // result:MealsModel[] = [];
  result:MealsResult = {} as MealsResult;
  search:string="";
  status:string="";
  detail:NutritionDetail = {} as NutritionDetail;
  display:boolean[]=[];
  id:number=0;
  recipeId:number =0;

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

    addFavorite(recipeId:number):void{
      this.recipeService.addFavorite(recipeId, this.userId).subscribe((response:Favorite)=>{
        console.log(response);
      })
    }

  }

}
