import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Product} from '../models/product.model';

@Injectable()
export class CheckoutService {
  private url = 'http://localhost:8000/api';
  private products = {};

  constructor(private http: Http) {}

  resetCheckout() {
    this.products = {};
  }

  addProductToCheckout(prod: Product, qnt) {
    if (this.products[prod.id] === undefined) {
      this.products[prod.id] = prod;
      this.products[prod.id]['qnt'] = 0;
    }
    this.products[prod.id]['qnt'] += qnt;
    alert("+" + qnt + " '" + prod.name + "' foi adicionado ao carrinho!");
  }

  removeProductFromCheckout(prodID) {
    delete this.products[prodID];
  }

  getProductsToCheckout() {
    let checkoutProducts: any[] = [];
    for (let k in this.products) {
      checkoutProducts.push(this.products[k]);
    }
    return checkoutProducts;
  }

  checkout(purch: any) {
    return this.http.post(this.url + '/purchase', purch)
      .map((res: Response) => res.json());
  }
}
