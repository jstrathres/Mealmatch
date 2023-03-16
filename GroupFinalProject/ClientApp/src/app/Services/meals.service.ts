import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealsModel, MealsResult } from '../Models/Meals';
import { Secret } from '../Models/secret';

@Injectable({
  providedIn: 'root'
})
export class MealsService {


  // url2:string=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apiKey}`
  url:string=`https://api.spoonacular.com/recipes/search?apiKey=${Secret.apiKey}&includeNutrition=true`;
  
  constructor(private http: HttpClient) { }

  getMeals():Observable<MealsResult>{
    return this.http.get<MealsResult>(this.url);
  }

}
