using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroupFinalProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupFinalProject.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        MealmatchContext context = new MealmatchContext();

       
      

        //User Favorite DB Calls
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

        //Add Recipe to internal DB
        [HttpPost]
        public Recipe AddRecipe(int recipeid, string recipeTitle, string img, string sourceUrl, int readyInMinutes, int servings,
            string dishTypes, decimal totalCalories, string caloricBreakdown, string ingredients, string instructions)
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
                    Servings = servings,
                    DishTypes = dishTypes,
                    TotalCalories = totalCalories,
                    CaloricBreakdown = caloricBreakdown,
                    Ingredients = ingredients,
                    Instructions = instructions
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

        //Profile DB Calls
        [HttpPost("addProfile")]      
        public Profile addProfile(string userId,decimal height,decimal weight,string goal)
        {
            Profile newProfile = new Profile()
            {
                UserId = userId,
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
        [HttpGet("getMeals")]        
            public List<Recipe> getMeals(string userid)
            {

                List<MealPlan> mealList = new List<MealPlan>();
                mealList = context.MealPlans.Where(m => m.UserId == userid).ToList();
                List<Recipe> newRs = new List<Recipe>();
                foreach (MealPlan m in mealList)
                {
                    newRs.Add(context.Recipes.FirstOrDefault(r => r.Id == m.RecipeId));
                }
                return newRs.DistinctBy(r => r.RecipeId).ToList();
            }

        [HttpGet("getAllMeals")]

        public List<MealPlan> getAllMeals(string userid)
        {
            return context.MealPlans.Include(m => m.Recipe).Where(f => f.UserId == userid).ToList();
        }

        [HttpGet("getMealPlanView")]
        public List<MealPlanView> getMealPlanViews(string userid)
        {
            List<MealPlanView> mealPlanViews = new List<MealPlanView>();
            List<MealPlan> mealList = new List<MealPlan>();
            mealList = context.MealPlans.Where(m => m.UserId == userid).ToList();

            foreach (MealPlan m in mealList)
            {
                MealPlanView mpv = new MealPlanView()
                {
                    Id = m.Id,
                    UserId = m.UserId,
                    Date = (DateTime)m.Date,
                    Recipe = context.Recipes.FirstOrDefault(r => r.Id == m.RecipeId)
                };
                mealPlanViews.Add(mpv);
            }
            return mealPlanViews;
        }

        [HttpPost("addMealPlan")]
        public MealPlan addMealPlan(string userId,int recipeId,DateTime date)
        {
            MealPlan newmealplan = new MealPlan()
            {
                UserId = userId,
                RecipeId = recipeId,
                Date = date          

            };
            context.MealPlans.Add(newmealplan);
            context.SaveChanges();
            return newmealplan;
        }

        [HttpDelete("deleteMealplan")]
        public MealPlan deleteMealPlan(string userId,int id)
        {

            MealPlan mealplan = context.MealPlans.FirstOrDefault(m => m.UserId == userId && m.Id==id);

            context.MealPlans.Remove(mealplan);
            context.SaveChanges();
            return mealplan;     
        }

    }
}

