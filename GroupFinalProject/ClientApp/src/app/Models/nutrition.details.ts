export interface NutritionDetail {
    calories: string;
    carbs:    string;
    fat:      string;
    protein:  string;
    bad:      Bad[];
    good:     Bad[];
    expires:  number;
    isStale:  boolean;
}

export interface Bad {
    title:               string;
    amount:              string;
    indented:            boolean;
    percentOfDailyNeeds: number;
}
