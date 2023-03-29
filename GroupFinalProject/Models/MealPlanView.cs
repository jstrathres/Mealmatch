using System;
namespace GroupFinalProject.Models
{
	public class MealPlanView
	{
        public int Id { get; set; }

        public string UserId { get; set; }

        public DateTime Date { get; set; }

        public Recipe Recipe { get; set; }
    }
}

