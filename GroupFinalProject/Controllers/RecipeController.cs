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
            if (context.Recipes.Count(r => r.RecipeId == recipeid) == 0)
            {
                Recipe newRecipe = new Recipe()
                {
                    RecipeId = recipeid,
                    RecipeTitle = recipeTitle,
                    Image = img,
                    SourceUrl = sourceUrl,
                    ReadyInMinutes = readyInMinutes,
                    Servings = servings
                };
                context.Recipes.Add(newRecipe);
                context.SaveChanges();
                return newRecipe;
            }
            else
            {
                return context.Recipes.FirstOrDefault(r => r.RecipeId == recipeid);
            }
        }

        //[HttpDelete]
        //public List <Favorite> DeleteRecipe(int recipeId, string userId)
        //{

        //    List <Favorite> recipes = context.Favorites.Where(r=> r.UserId == userId).ToList();
        //    foreach (Favorite R in recipes)
        //    {
        //        if(R.RecipeId == recipeId)
        //        {
        //            context.Favorites.Remove(R);
        //            context.SaveChanges();
        //        }
        //    }
        //    return recipes;
        //}

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
        public List<Favorite> deleteFavorite(int recipeId,string userid)
        {
            List<Favorite> recipes = context.Favorites.Where(r => r.UserId == userid).ToList();
            foreach (Favorite R in recipes)
            {
                if (R.RecipeId == recipeId)
                {
                    context.Favorites.Remove(R);
                    context.SaveChanges();
                }
            }
            return recipes;
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
                newRs.Add(context.Recipes.FirstOrDefault(r => r.Id== f.RecipeId));
            }
            return newRs.DistinctBy(r=>r.RecipeId).ToList();
        }
        [HttpPost("addProfile")]      
        public Profile addProfile(string userid,decimal height,decimal weight,string goal)
        {
            Profile newProfile = new Profile()
            {
                UserId = userid,
                Height = height,
                Weight = weight,
                Goal = goal
            };
            context.Profiles.Add(newProfile);
            context.SaveChanges();
            return newProfile;
        }

        [HttpGet("getProfile")]
        public Profile getProfile(string userid)
        {
            Profile profile = context.Profiles.FirstOrDefault(u => u.UserId== userid);
            return profile;
        }

        [HttpPut("updateProfile")]

        public Profile updateProfile(string userid, decimal weight,string goal)
        {
            Profile profile = context.Profiles.FirstOrDefault(u => u.UserId == userid);
            profile.Weight = weight;
            profile.Goal = goal;

            context.Profiles.Update(profile);
            context.SaveChanges();
            return profile;
        }

        [HttpDelete("deleteProfile")]
        public Profile deleteProfile(string userid)
        {
            Profile profile = context.Profiles.FirstOrDefault(d => d.UserId == userid);

            context.Profiles.Remove(profile);
            context.SaveChanges();
            return profile;
        }


    }
}

