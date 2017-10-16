import { Component } from '@angular/core';
import {CheckoutService} from './services/checkout.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  searchValue: string = '';

  constructor(private checkoutService: CheckoutService,
              private router: Router,
              private route: ActivatedRoute) {
    this.router.events.subscribe((data: NavigationEnd) => {
      /*console.log(this.route.);*/
    });
  }

  getCheckoutCount() {
    return this.checkoutService.getCheckoutProductsCount();
  }
}
