import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealDetail } from '../Models/meal-detail';
import { MealsResult } from '../Models/Meals';
import { NutritionDetail } from '../Models/nutrition.details';
import { Secret } from '../Models/secret';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  //External API

  url2: string = `https://api.spoonacular.com/recipes`;
  url: string = `https://api.spoonacular.com/recipes/search?apiKey=${Secret.apiKey}&includeNutrition=true&query=`;
  url3:string = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${Secret.apiKey}&addRecipeInformation=true&addRecipeNutrition=true&query=`

  constructor(private http: HttpClient) {}

  // getMeals(Input: string): Observable<MealsResult> {
  //   return this.http.get<MealsResult>(`${this.url}${Input}&number=21`);
  // }

  // getDetails(id: number): Observable<NutritionDetail> {
  //   return this.http.get<NutritionDetail>(
  //     `${this.url2}/${id}/nutritionWidget.json?apiKey=${Secret.apiKey}`
  //   );
  // }
  
//experimental code
  getMeals2(Input: string): Observable<MealDetail> {
    return this.http.get<MealDetail>(`${this.url3}${Input}&number=6`);
  }
  
}
