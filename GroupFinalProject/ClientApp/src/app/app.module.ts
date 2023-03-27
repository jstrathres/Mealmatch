import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { MealsComponent } from './Components/meals/meals.component';
import { NutritiondetailComponent } from './Components/nutritiondetail/nutritiondetail.component';
import { Secret } from './Models/secret';
import { ProfileComponent } from './Components/profile/profile.component';
import { MealplanComponent } from './Components/mealplan/mealplan.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FavoritesComponent,
    MealsComponent,
    NutritiondetailComponent,
    ProfileComponent,
    MealplanComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'meals', component: MealsComponent},
      { path: 'meals/:id', component: MealsComponent},
      {path: 'favorites', component:FavoritesComponent},
      {path: 'profile', component:ProfileComponent},
      {path: 'mealplan', component:MealplanComponent}
    ])
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
      	autoLogin: false,
      	providers: [
      	  {
      	    id: GoogleLoginProvider.PROVIDER_ID,
      	    provider: new GoogleLoginProvider(
      	      Secret.clientId
      	    )
      	  }
      	]
      } as SocialAuthServiceConfig,
    }
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
