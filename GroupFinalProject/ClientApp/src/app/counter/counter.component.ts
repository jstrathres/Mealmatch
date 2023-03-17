import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  constructor(private authService: SocialAuthService, private router:Router) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      //brings user homepage if not logged in
      if(this.loggedIn == false){
        this.router.navigate(['/'])
      }
    });
  }

  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
