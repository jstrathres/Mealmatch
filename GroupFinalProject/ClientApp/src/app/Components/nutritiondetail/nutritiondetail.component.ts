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
    })
    }
    toggleDisplay():void{
      this.display = !this.display;
     }

}
