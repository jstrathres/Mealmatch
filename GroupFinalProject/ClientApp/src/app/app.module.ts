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
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { MealsComponent } from './Components/meals/meals.component';
import { NutritiondetailComponent } from './Components/nutritiondetail/nutritiondetail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RecipesComponent,
    MealsComponent,
    NutritiondetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'meals', component: MealsComponent},
      { path: 'meals/:id', component: MealsComponent}
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
      	      '311521076002-5cg2nuht56tpvl0eh36sv8aru36hp3uo'
      	    )
      	  }
      	]
      } as SocialAuthServiceConfig,
    }
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
