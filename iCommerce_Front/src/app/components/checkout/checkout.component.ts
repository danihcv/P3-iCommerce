import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CheckoutService} from '../../services/checkout.service';
import {PurchaseModel} from '../../models/purchase.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  products = [];
  totalPrice = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private checkoutService: CheckoutService,
              private titleService: Title) {
    this.titleService.setTitle('iCommerce - Carrinho');
    this.products = this.checkoutService.getProductsToCheckout();
    for (const p of this.products) {
      if (p.qnt > p.stock) {
        p.qnt = p.stock;
      }
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

  remove(id: number) {
    this.products = this.checkoutService.removeProductFromCheckout(id);
//    this.products.splice(idx, 1);
    this.recalculateTotalPrice();
  }

  hasProducts() {
    return this.products.length > 0;
  }

  checkout() {
    this.checkoutService.checkout({
      'idUser': 1,
      'totalPrice': this.totalPrice,
      'date': this.formatDate(new Date()),
      'products': this.getProductsIDs()
    }).subscribe(() => {
        this.checkoutService.resetCheckout();
        alert('Compra efetuada com sucesso!');
        this.router.navigate(['/']);
      },
        () => alert('Algo deu errado!\nPor favor tente novamente mais tarde.')
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
