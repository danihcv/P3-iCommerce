import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {CheckoutService} from '../../services/checkout.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html'
})
export class ViewProductComponent implements OnInit {
  product: Product;
  id: number;
  qnt: number = 1;

  constructor(private router: ActivatedRoute,
              private productService: ProductService,
              private checkoutService: CheckoutService) {
    router.params.subscribe((value) => {
      this.id = +value['id'];
      productService.getProduct(this.id).subscribe((data: Product) => {
        this.product = data;
      }, err => console.log('REDIRECIONAR PARA 404!'));
    });
  }

  ngOnInit() {}

  addToCheckout() {
    if (!Number.isInteger(this.qnt) || this.qnt <= 0) {
      alert('Por favor, verifique a quantidade informada!');
    } else if (this.qnt > this.product.stock) {
      alert('Não temos tudo isso em estoque.\n:(');
    } else if (this.qnt > 0) {
      this.checkoutService.addProductToCheckout(this.product, this.qnt);
    }
  }
}
