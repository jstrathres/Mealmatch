import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealsModel, MealsResult } from '../Models/Meals';
import { NutritionDetail } from '../Models/nutrition.details';
import { Secret } from '../Models/secret';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  

 url2:string=`https://api.spoonacular.com/recipes`
 url:string=`https://api.spoonacular.com/recipes/search?apiKey=${Secret.apiKey}&includeNutrition=true&query=`;
 
 constructor(private http: HttpClient) { }

 getMeals(Input:string):Observable<MealsResult>{
   return this.http.get<MealsResult>(`${this.url}${Input}&number=10`);
 }


 getDetails(id:number):Observable<NutritionDetail>{
   return this.http.get<NutritionDetail>(`${this.url2}/${id}/nutritionWidget.json?apiKey=${Secret.apiKey}`)
 }

}
