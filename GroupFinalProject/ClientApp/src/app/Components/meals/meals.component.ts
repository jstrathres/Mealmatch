import { Component, OnInit } from '@angular/core';
import { MealsModel, MealsResult } from 'src/app/Models/Meals';
import { MealsService } from 'src/app/Services/meals.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  constructor(private mealService:MealsService) { }

  result:MealsResult = {} as MealsResult;
  search:string="aww";
  status:string="";

  ngOnInit() {
    this.searchInput();
    }
    
    searchInput(){
    this.mealService.getMeals(this.search).subscribe((response:MealsResult)=>{
      console.log(response);
      this.result = response;

    },
    (error)=>{
      console.log(error)
      this.status= `${this.search} not a valid input`
    }
    );

    }
  

}
