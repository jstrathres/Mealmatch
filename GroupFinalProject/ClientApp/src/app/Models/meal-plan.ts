import { Recipe } from "./recipe";

export interface MealPlan {
    id:number;
    userId:string;
    recipeId:number;
    date:Date;
    
}
