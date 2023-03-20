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
        public List<Favorite> getRecipeByUserId(string userid)
        {
            return context.Favorites.Where(r => r.UserId == userid).ToList();
        }

        [HttpPost]
        public Recipe AddRecipe(int recipeid, string recipeTitle, string img, string sourceUrl, int readyInMinutes, int servings)
        {
            Recipe newRecipe = new Recipe()
            {
                RecipeId = recipeid,               
                RecipeTitle= recipeTitle,
                Image= img,
                SourceUrl=sourceUrl,
                ReadyInMinutes=readyInMinutes,
                Servings= servings
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

        [HttpPost("addFavorite")]
        public Favorite addFavorite(int recipeId,string userid)
        {
            Favorite newFavorite = new Favorite()
            {
                RecipeId = recipeId,
                UserId = userid
            };
            context.Favorites.Add(newFavorite);
            context.SaveChanges();
            return newFavorite;
        }



        [HttpDelete("deleteFavorite")]
        public void deleteFavorite(int recipeId,string userid)
        {
            Favorite f = context.Favorites.FirstOrDefault(q=>q.RecipeId== recipeId && q.UserId == userid);
            context.Favorites.Remove(f);
            context.SaveChanges();
            
        }

        [HttpGet("getFavorite")]
        public List<Recipe> getFavorites(string userid)
        {
            List<Favorite> favList = new List<Favorite>();
            favList = context.Favorites.Where(f => f.UserId== userid).ToList();
            bool idExist = favList.Any();
            List<Recipe> newRs = new List<Recipe>();
            foreach(Favorite f in favList)
            {
                newRs.Add(context.Recipes.FirstOrDefault(r => r.RecipeId== f.RecipeId));
            }
            return newRs;
        }


    }
}

