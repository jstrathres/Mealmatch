using System;
using System.Collections.Generic;

namespace GroupFinalProject.Models;

public partial class Favorite
{
    public int Id { get; set; }

    public string? UserId { get; set; }

    public int? RecipeId { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual Recipe? Recipe { get; set; }
}
