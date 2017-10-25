import { Component } from '@angular/core';
import {CheckoutService} from './services/checkout.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  searchValue = '';

  constructor(private checkoutService: CheckoutService,
              private router: Router,
              private route: ActivatedRoute,
              private cookieService: CookieService,
              private userService: UserService) {
    this.router.events.subscribe((data: NavigationEnd) => {
      /*console.log(this.route.);*/
    });

    const token = this.cookieService.get('token_access');
    console.log('token', token !== '');
    if (token !== '') {
      this.userService.loginByToken(token);
    }
  }

  getCheckoutCount() {
    return this.checkoutService.getCheckoutProductsCount();
  }

  isLogged() {
    return this.userService.isLogged();
  }

  isAdmin() {
    console.log('admin', this.userService.isAdmin());
    return this.userService.isAdmin();
  }
}
