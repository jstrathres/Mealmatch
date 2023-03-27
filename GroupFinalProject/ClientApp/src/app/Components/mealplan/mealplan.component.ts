import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})
export class MealplanComponent implements OnInit {

  setDate:Date={} as Date;
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  constructor(private userService: UserService, private authService:SocialAuthService) { }

  ngOnInit(): void {
 this.authService.authState.subscribe((user) => {
  	  this.user = user;
  	  this.loggedIn = (user != null);
      console.log(this.user);
      this.userService.getMeals(user.id);
    });
  }
}
