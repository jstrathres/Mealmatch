import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from '../Models/favorite';
import { Recipe } from '../Models/recipe';
import { Profile } from 'oidc-client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  // Favorites Calls
  addFavorite(recipeId: number, userId: string): Observable<Favorite> {
    return this.http.post<Favorite>(
      `${this.baseUrl}api/User/addFavorite?RecipeId=${recipeId}&UserId=${userId}`,
      {}
    );
  }

  deleteFavorite(recipeId: number, userId: string): Observable<Favorite> {
    return this.http.delete<Favorite>(
      `${this.baseUrl}api/User/deleteFavorite?recipeId=${recipeId}&userid=${userId}`,
      {}
    );
  }

  getFavorite(userId: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${this.baseUrl}api/User/getFavorite?UserId=${userId}`
    );
  }

  // Our Recipe DB Call
  addRecipe(
    recipeId: number,
    recipeTitle: string,
    image: string,
    sourceUrl: string,
    readyInMinutes: number,
    servings: number
  ): Observable<Recipe> {
    return this.http.post<Recipe>(
      `${this.baseUrl}api/User?RecipeId=${recipeId}
    &RecipeTitle=${recipeTitle}&Image=${image}
    &SourceUrl=${sourceUrl}&ReadyInMinutes=${readyInMinutes}&Servings=${servings}`,
      {}
    );
  }

  // Profile Calls
  addProfile(newProfile: Profile): Observable<Profile> {
    return this.http.post<Profile>(
      `${this.baseUrl}api/User/addProfile?userid=${newProfile.userId}
    &height=${newProfile.height}&weight=${newProfile.weight}&goal=${newProfile.goal}`,
      {}
    );
  }

  getProfile(userId: string): Observable<Profile> {
    return this.http.get<Profile>(
      `${this.baseUrl}api/User/getProfile?userid=${userId}`,
      {}
    );
  }

  updateProfile(
    UserId: string,
    Weight: number,
    Goal: string
  ): Observable<Profile> {
    return this.http.put<Profile>(
      `${this.baseUrl}api/User/updateProfile?userid=${UserId}
    &weight=${Weight}&goal=${Goal}`,
      {}
    );
  }

  deleteProfile(userId: string): Observable<Profile> {
    return this.http.delete<Profile>(
      `${this.baseUrl}api/User/deleteProfile?userid=${userId}`,
      {}
    );
  }
}
