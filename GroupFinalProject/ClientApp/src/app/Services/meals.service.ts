import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealDetail } from '../Models/meal-detail';
import { Secret } from '../Models/secret';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  //External API

  // url2: string = `https://api.spoonacular.com/recipes`;
  // url3: string = `https://api.spoonacular.com/recipes/search?apiKey=${Secret.apiKey}&includeNutrition=true&query=`;
  url:string = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${Secret.apiKey}&addRecipeInformation=true&addRecipeNutrition=true&number=6&`

  constructor(private http: HttpClient) {}

  
//external API call
  getMeals(Input: string): Observable<MealDetail> {
    return this.http.get<MealDetail>(`${this.url}query=${Input}`);
  }

  getMealsCat(Cat: string): Observable<MealDetail> {
    return this.http.get<MealDetail>(`${this.url}type=${Cat}`);
  }

  getMealsCatQuery(Cat:string, Input: string): Observable<MealDetail> {
    return this.http.get<MealDetail>(`${this.url}type=${Cat}&query=${Input}`);
  }
}
