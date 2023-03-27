
export interface Recipe {
    id:number;
    recipeId:number;
    recipeTitle:string;
    readyInMinutes:number;
    servings:number;
    sourceUrl:string;
    image:string;
    dishTypes:string;
    totalCalories:number;
    caloricBreakdown:string;
    ingredients:string;
    instructions:string;
}
