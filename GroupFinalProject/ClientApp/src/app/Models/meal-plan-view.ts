import { Recipe } from "./recipe";

export interface MealPlanView {
    id:number;
    userId:string;
    date:Date;
    recipe:Recipe;
}
