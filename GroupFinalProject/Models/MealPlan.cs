using System;
using System.Collections.Generic;

namespace GroupFinalProject.Models;

public partial class MealPlan
{
    public int Id { get; set; }

    public string? UserId { get; set; }

    public int? RecipeId { get; set; }

    public DateTime? Date { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual Recipe? Recipe { get; set; }
}
