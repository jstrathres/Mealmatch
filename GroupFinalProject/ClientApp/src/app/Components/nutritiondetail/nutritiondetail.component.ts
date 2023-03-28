import { Component, Input, OnInit } from '@angular/core';
import { NutritionDetail } from '../../Models/nutrition.details';
import { MealsService } from '../../Services/meals.service';

@Component({
  selector: 'app-nutritiondetail',
  templateUrl: './nutritiondetail.component.html',
  styleUrls: ['./nutritiondetail.component.css']
})
export class NutritiondetailComponent implements OnInit {
@Input() Nutrients: number=0;

  constructor(private nutritionService:MealsService) { }

// Object variable
  result:NutritionDetail = {} as NutritionDetail;
// Toggle boolean
  // display:boolean = false;

  ngOnInit(): void {

    // this.nutritionService.getDetails(this.Nutrients).subscribe((response:NutritionDetail)=>{
    //   this.result=response;
    // })
  }

// toggle methods
    // toggleDisplay():void{
    //   this.display = !this.display;
    //  }

//  Goal based on calorie methods
     newGoal() {
      // calorie number conversion
      let cal:number = Number(this.result.calories.substring(0, this.result.calories.length - 1));
      // math based on calories
      let newcal = cal/100;
      console.log(newcal);
      // goal output
      return `Your Goal for Today, Please Walk ${newcal} Miles, Are You Serious`;
     }
}
