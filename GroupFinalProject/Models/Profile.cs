using System;
using System.Collections.Generic;

namespace GroupFinalProject.Models;

public partial class Profile
{
    public int Id { get; set; }

    public string? UserId { get; set; }

    public decimal? Height { get; set; }

    public decimal? Weight { get; set; }

    public string? Goal { get; set; }
}
