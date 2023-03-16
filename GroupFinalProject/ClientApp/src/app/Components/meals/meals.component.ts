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


  ngOnInit() {
    this.mealService.getMeals().subscribe((response:MealsResult)=>{
      console.log(response);
      this.result = response;
    })
  };

}
