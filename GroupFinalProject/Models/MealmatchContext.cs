using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GroupFinalProject.Models;

public partial class MealmatchContext : DbContext
{
    public MealmatchContext()
    {
    }

    public MealmatchContext(DbContextOptions<MealmatchContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<MealPlan> MealPlans { get; set; }

    public virtual DbSet<Profile> Profiles { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=mealmatch.database.windows.net;Initial Catalog=Mealmatch; User Id=groupproject; Password=GrandMeals123");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Favorite__3214EC07425EDFDB");

            entity.HasOne(d => d.Recipe).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("FK__Favorites__Recip__5EBF139D");
        });

        modelBuilder.Entity<MealPlan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MealPlan__3214EC073F82EBCE");

            entity.ToTable("MealPlan");

            entity.Property(e => e.Date).HasColumnType("date");

            entity.HasOne(d => d.Recipe).WithMany(p => p.MealPlans)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("FK__MealPlan__Recipe__6383C8BA");
        });

        modelBuilder.Entity<Profile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Profile__3213E83F20CC1D27");

            entity.ToTable("Profile");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Goal).HasMaxLength(300);
            entity.Property(e => e.Height).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.Weight).HasColumnType("decimal(18, 0)");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Recipe__3214EC07137EE07C");

            entity.ToTable("Recipe");

            entity.Property(e => e.TotalCalories).HasColumnType("decimal(18, 0)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
