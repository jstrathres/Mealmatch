import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from '../Models/favorite';
import { Recipe } from '../Models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(@Inject('BASE_URL') private baseUrl: string, private http:HttpClient) { }

addFavorite(recipeId: number, userId:string):Observable<Favorite>{
  return this.http.post<Favorite>(`${this.baseUrl}api/Recipe/addFavorite?RecipeId=${recipeId}&UserId=${userId}`,{})
}

deleteFavorite(recipeId:number, userId:string):Observable<Favorite>{
  return this.http.delete<Favorite>(`${this.baseUrl}api/Recipe/deleteFavorite?RecipeId=${recipeId}&UserId=${userId}`,{})
}

getFavorite(userId:string):Observable<Favorite[]>{
  return this.http.get<Favorite[]>(`${this.baseUrl}api/Recipe/getFavorite?UserId=${userId}`);
}

getRecipe():Observable<Recipe[]>{
  return this.http.get<Recipe[]>(`${this.baseUrl}api/Recipe/getRecipes`);
}
addRecipe(recipeId:number,recipeTitle:string,image:string, sourceUrl:string, readyInMinutes:number,servings:number):Observable<Recipe>{
  return this.http.post<Recipe>(`${this.baseUrl}api/Recipe/AddRecipe?RecipeId=${recipeId}&RecipeTitle=${recipeTitle}&Image=${image}
  &SourceUrl=${sourceUrl}&ReadyInMinutes=${readyInMinutes}&Servings=${servings}`,{})
}
getRecipeByuserid(userId:string):Observable<Recipe[]>{
  return this.http.get<Recipe[]>(`${this.baseUrl}api/Recipe/getRecipeByUserId/UserId=${userId}`,{})
}
deleteRecipe(id:number):Observable<Recipe>{
  return this.http.delete<Recipe>(`${this.baseUrl}api/Recipe/DeleteRecipe?Id=${id}`,{})
}

}
