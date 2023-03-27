using System;
using System.Collections.Generic;

namespace GroupFinalProject.Models;

public partial class Recipe
{
    public int Id { get; set; }

    public int? RecipeId { get; set; }

    public string? RecipeTitle { get; set; }

    public int? ReadyInMinutes { get; set; }

    public int? Servings { get; set; }

    public string? SourceUrl { get; set; }

    public string? Image { get; set; }

    public string? DishTypes { get; set; }

    public decimal? TotalCalories { get; set; }

    public string? CaloricBreakdown { get; set; }

    public string? Ingredients { get; set; }

    public string? Instructions { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual ICollection<Favorite> Favorites { get; } = new List<Favorite>();
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual ICollection<MealPlan> MealPlans { get; } = new List<MealPlan>();
}
