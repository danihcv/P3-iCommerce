import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckoutService} from '../../services/checkout.service';
import {PurchaseModel} from '../../models/purchase.model';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  products = [];
  totalPrice = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private checkoutService: CheckoutService) {
    this.products = this.checkoutService.getProductsToCheckout();
    for (let p of this.products) {
      this.totalPrice += (p.price * p.qnt);
    }
  }

  ngOnInit() {}

  recalculateTotalPrice() {
    let tPrice = 0;
    for (let p of this.products) {
      tPrice += (p.price * p.qnt);
    }
    this.totalPrice = tPrice;
  }

  remove(idx: number) {
    this.products.splice(idx, 1);
    this.recalculateTotalPrice();
  }

  hasProducts() {
    return this.products.length > 0;
  }

  checkout() {
    console.log(this.formatDate(new Date()));
    this.checkoutService.checkout({
      'idUser': 1,
      'totalPrice': this.totalPrice,
      'date': this.formatDate(new Date()),
      'products': this.getProductsIDs()
    }).subscribe(() => {
        this.checkoutService.resetCheckout();
        alert("Compra efetuada com sucesso!");
        this.router.navigate(['/']);
      },
        () => alert("Algo deu errado!\nPor favor tente novamente mais tarde.")
    );
  }

  getProductsIDs() {
    let ids = [];
    for (let p of this.products) {
      ids.push({'idProduct': p.id, 'quantity': p.qnt});
    }
    return ids;
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

}
