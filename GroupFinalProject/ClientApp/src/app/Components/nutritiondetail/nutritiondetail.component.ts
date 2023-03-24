import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NutritionDetail } from '../../Models/nutrition.details';
import { MealsService } from '../../Services/meals.service';

@Component({
  selector: 'app-nutritiondetail',
  templateUrl: './nutritiondetail.component.html',
  styleUrls: ['./nutritiondetail.component.css']
})
export class NutritiondetailComponent implements OnInit {
@Input() Nutrients: number=0;

  constructor(private route:ActivatedRoute, private nutritionService:MealsService) { }

  result:NutritionDetail = {} as NutritionDetail;
  display:boolean = false;

  ngOnInit(): void {
    
    //   const routeParams = this.route.snapshot.paramMap;
    // let id:number = Number(routeParams.get("id"));
    // console.log(id);

    this.nutritionService.getDetails(this.Nutrients).subscribe((response:NutritionDetail)=>{
      
      this.result=response;

      console.log(Number(this.result.calories.substring(0, this.result.calories.length - 1)));
      let cal:number = Number(this.result.calories.substring(0, this.result.calories.length - 1));
      return cal;
    })
  }

    toggleDisplay():void{
      this.display = !this.display;
     }

     newGoal() {
      let cal:number = Number(this.result.calories.substring(0, this.result.calories.length - 1));
      let newcal = cal/100;
      console.log(newcal);
      return `Your Goal for Today, Please Walk ${newcal} Miles, Are You Serious`;
     }
}
