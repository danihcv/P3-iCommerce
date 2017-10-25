import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {CheckoutService} from '../../services/checkout.service';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html'
})
export class ViewProductComponent implements OnInit {
  product: Product;
  id: number;
  qnt = 1;
  deleteOption = 'Excluir';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private checkoutService: CheckoutService,
              private titleService: Title,
              private userService: UserService) {
    route.params.subscribe((value) => {
      this.id = +value['id'];
      productService.getProduct(this.id).subscribe((data: Product) => {
        this.product = data;
        this.titleService.setTitle('iCommerce - ' + this.product.name);
        if (!this.product.isAvailable) {
          this.deleteOption = 'Restaurar';
        }
      }, err => router.navigate(['/']));
    });
  }

  ngOnInit() {}

  addToCheckout() {
    if (this.hasStock()) {
      if (!Number.isInteger(this.qnt) || this.qnt <= 0) {
        alert('Por favor, verifique a quantidade informada!');
      } else if (this.qnt > this.product.stock) {
        alert('Não temos tudo isso em estoque.\n:(');
      } else if (this.qnt > 0) {
        this.checkoutService.addProductToCheckout(this.product, this.qnt);
      }
    }
  }

  hasStock() {
    return this.product !== undefined && this.product.stock > 0;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id)
      .subscribe(() => this.router.navigate(['/']));
  }

  isAdmin() {
    return this.userService.isAdmin();
  }
}
