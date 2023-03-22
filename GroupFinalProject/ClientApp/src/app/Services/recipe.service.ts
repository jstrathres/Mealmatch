import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from '../Models/favorite';
import { Recipe } from '../Models/recipe';
import { Profile } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(@Inject('BASE_URL') private baseUrl: string, private http:HttpClient) { }

addFavorite(recipeId: number, userId:string):Observable<Favorite>{
  return this.http.post<Favorite>(`${this.baseUrl}api/Recipe/addFavorite?RecipeId=${recipeId}&UserId=${userId}`,{})
}

deleteFavorite(recipeId:number, userId:string):Observable<Favorite>{
  return this.http.delete<Favorite>(`${this.baseUrl}api/Recipe/deleteFavorite?recipeId=${recipeId}&userid=${userId}`,{})
}

getFavorite(userId:string):Observable<Recipe[]>{
  return this.http.get<Recipe[]>(`${this.baseUrl}api/Recipe/getFavorite?UserId=${userId}`);
}

getRecipe():Observable<Recipe[]>{
  return this.http.get<Recipe[]>(`${this.baseUrl}api/Recipe/getRecipes`);
}
addRecipe(recipeId:number,recipeTitle:string,image:string, sourceUrl:string, 
  readyInMinutes:number,servings:number):Observable<Recipe>{
  return this.http.post<Recipe>(`${this.baseUrl}api/Recipe?RecipeId=${recipeId}
  &RecipeTitle=${recipeTitle}&Image=${image}
  &SourceUrl=${sourceUrl}&ReadyInMinutes=${readyInMinutes}&Servings=${servings}`,{})
}
getRecipeByuserid(userId:string):Observable<Recipe[]>{
  return this.http.get<Recipe[]>(`${this.baseUrl}api/Recipe/getRecipeByUserId/UserId=${userId}`,{})
}
deleteRecipe(recipeId:number, userId:string):Observable<Favorite>{
  return this.http.delete<Favorite>(`${this.baseUrl}api/Recipe/DeleteRecipe?recipeId=${recipeId}&userId=${userId}`,{})
}

addProfile(UserId:string,Height:number,Weight:number,Goal:string): 
  Observable<Profile>{
  return this.http.post<Profile>(`${this.baseUrl}api/Recipe/addProfile?userid=${UserId}
  &height=${Height}&weight=${Weight}&goal=${Goal}`,{})
  }

updateProfile(UserId:string,Weight:number,Goal:string): 
Observable<Profile>{
return this.http.put<Profile>(`${this.baseUrl}api/Recipe/updateProfile?userid=${UserId}
&weight=${Weight}&goal=${Goal}`,{})
}

getProfile(userId:string):Observable<Profile>{
  return this.http.get<Profile>(`${this.baseUrl}api/Recipe/getProfile?userid=${userId}`,{});
}

deleteProfile(userId:string):Observable<Profile>{
  return this.http.delete<Profile>(`${this.baseUrl}api/Recipe/deleteProfile?userid=${userId}`,{})
}

}
