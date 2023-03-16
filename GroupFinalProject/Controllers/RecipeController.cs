using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroupFinalProject.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupFinalProject.Controllers
{
    [Route("api/[controller]")]
    public class RecipeController : Controller
    {
        MealmatchContext context = new MealmatchContext();

        [HttpGet]
        public List<Recipe> getRecipes()
        {
            return context.Recipes.ToList();
        }

        [HttpGet("{userid}")]
        public List<Recipe> getRecipeByUserId(string userid)
        {
            return context.Recipes.Where(r => r.UserId == userid).ToList();
        }

        [HttpPost]
        public Recipe AddRecipe(int recipeid, string userid)
        {
            Recipe newRecipe = new Recipe()
            {
                RecipeId = recipeid,
                UserId = userid
            };
            context.Recipes.Add(newRecipe);
            context.SaveChanges();
            return newRecipe;
        }

        [HttpDelete]
        public Recipe DeleteRecipe(int id)
        {
            Recipe recipe = context.Recipes.FirstOrDefault(r => r.Id == id);
            context.Recipes.Remove(recipe);
            context.SaveChanges();
            return recipe;
        }
    }
}

