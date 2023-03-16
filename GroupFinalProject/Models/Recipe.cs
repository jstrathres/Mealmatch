using System;
using System.Collections.Generic;

namespace GroupFinalProject.Models;

public partial class Recipe
{
    public int Id { get; set; }

    public int? RecipeId { get; set; }

    public string? UserId { get; set; }
}
