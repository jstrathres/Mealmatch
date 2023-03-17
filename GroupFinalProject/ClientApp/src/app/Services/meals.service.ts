import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealsModel, MealsResult } from '../Models/Meals';
<<<<<<< HEAD
import { NutritionDetail } from '../Models/nutrition-detail';
=======
import { NutritionDetail } from '../Models/nutrition.details';
>>>>>>> 813e17b6ca2584290637ea6ec463623db0a09f10
import { Secret } from '../Models/secret';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

<<<<<<< HEAD
=======
  

   url2:string=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${Secret.apiKey}`
  url:string=`https://api.spoonacular.com/recipes/search?apiKey=${Secret.apiKey}&includeNutrition=true&query=`;
>>>>>>> 813e17b6ca2584290637ea6ec463623db0a09f10
  

<<<<<<< HEAD
 url2:string=`https://api.spoonacular.com/recipes`
 url:string=`https://api.spoonacular.com/recipes/search?apiKey=${Secret.apiKey}&includeNutrition=true&query=`;
 
 constructor(private http: HttpClient) { }

 getMeals(Input:string):Observable<MealsResult>{
   return this.http.get<MealsResult>(`${this.url}${Input}&number=3`);
 }


 getDetails(id:number):Observable<NutritionDetail>{
   return this.http.get<NutritionDetail>(`${this.url2}/${id}/nutritionWidget.json?apiKey=${Secret.apiKey}`)
 }
=======
  getMeals(Input:string):Observable<MealsResult>{
    return this.http.get<MealsResult>(`${this.url}${Input}/.json`);
  }
>>>>>>> 813e17b6ca2584290637ea6ec463623db0a09f10

  getDetails(id:number):Observable<NutritionDetail>{
    return this.http.get<NutritionDetail>(`${this.url2}/${id}/nutritionWidget.json?apiKey=${Secret.apiKey}`)
  }
}
