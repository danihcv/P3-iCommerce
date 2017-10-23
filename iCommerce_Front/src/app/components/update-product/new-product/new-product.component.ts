import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {Product} from '../../../models/product.model';
import {UpdateProduct} from '../update-product';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-new-product',
  templateUrl: '../update-product.html'
})
export class NewProductComponent extends UpdateProduct implements OnInit {

  constructor(protected productService: ProductService,
              protected router: Router,
              private titleService: Title) {
    super(productService, router);
    this.titleService.setTitle('iCommerce - Criar produto');
    this.action = 'Criar';
  }

  ngOnInit() {}

  submit() {
    this.productService.createProduct({'name': this.name, 'image': this.image, 'description': this.description,
      'price': this.price, 'category': this.createNewCategory ? this.newCategory : this.category, 'stock': this.stock})
      .subscribe(() => this.router.navigate(['']), (err) => {
        let res = JSON.parse(err._body);
        console.log(res);
        this.resetErrors();
        for (let k in res) {
          this.gotError[k] = true;
        }
      });
  }
}
