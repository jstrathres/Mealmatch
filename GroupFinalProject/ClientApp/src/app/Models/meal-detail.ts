export interface MealDetail {
    results:      Result[];
    offset:       number;
    number:       number;
    totalResults: number;
}

export interface Result {
    vegetarian:               boolean;
    vegan:                    boolean;
    glutenFree:               boolean;
    dairyFree:                boolean;
    veryHealthy:              boolean;
    cheap:                    boolean;
    veryPopular:              boolean;
    sustainable:              boolean;
    lowFodmap:                boolean;
    weightWatcherSmartPoints: number;
    gaps:                     Gaps;
    preparationMinutes:       number;
    cookingMinutes:           number;
    aggregateLikes:           number;
    healthScore:              number;
    creditsText:              CreditsText;
    sourceName:               SourceName;
    pricePerServing:          number;
    id:                       number;
    title:                    string;
    readyInMinutes:           number;
    servings:                 number;
    sourceUrl:                string;
    image:                    string;
    imageType:                ImageType;
    nutrition:                Nutrition;
    summary:                  string;
    cuisines:                 string[];
    dishTypes:                string[];
    diets:                    string[];
    occasions:                string[];
    analyzedInstructions:     AnalyzedInstruction[];
    spoonacularSourceUrl:     string;
    license?:                 string;
}

export interface AnalyzedInstruction {
    name:  string;
    steps: Step[];
}

export interface Step {
    number:      number;
    step:        string;
    ingredients: Ent[];
    equipment:   Ent[];
    length?:     Length;
}

export interface Ent {
    id:            number;
    name:          string;
    localizedName: string;
    image:         string;
    temperature?:  Length;
}

export interface Length {
    number: number;
    unit:   LengthUnit;
}

export enum LengthUnit {
    Fahrenheit = "Fahrenheit",
    Minutes = "minutes",
}

export enum CreditsText {
    FoodistaCOM = "foodista.com",
    FoodistaCOMTheCookingEncyclopediaEveryoneCanEdit = "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    PickfreshfoodsCOM = "pickfreshfoods.com",
}

export enum Gaps {
    No = "no",
}

export enum ImageType {
    Jpg = "jpg",
}

export interface Nutrition {
    nutrients:        Flavonoid[];
    properties:       Flavonoid[];
    flavonoids:       Flavonoid[];
    ingredients:      Ingredient[];
    caloricBreakdown: CaloricBreakdown;
    weightPerServing: WeightPerServing;
}

export interface CaloricBreakdown {
    percentProtein: number;
    percentFat:     number;
    percentCarbs:   number;
}

export interface Flavonoid {
    name:                 string;
    amount:               number;
    unit:                 FlavonoidUnit;
    percentOfDailyNeeds?: number;
}

export enum FlavonoidUnit {
    Empty = "",
    G = "g",
    Iu = "IU",
    Kcal = "kcal",
    Mg = "mg",
    Unit = "%",
    Μg = "µg",
}

export interface Ingredient {
    id:        number;
    name:      string;
    amount:    number;
    unit:      string;
    nutrients: Flavonoid[];
}

export interface WeightPerServing {
    amount: number;
    unit:   FlavonoidUnit;
}

export enum SourceName {
    Foodista = "Foodista",
    FoodistaCOM = "foodista.com",
    PickfreshfoodsCOM = "pickfreshfoods.com",
}
