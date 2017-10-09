import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import {Product} from '../../../models/product.model';
import {UpdateProduct} from "../update-product";

@Component({
  selector: 'new-product',
  templateUrl: '../update-product.html'
})
export class NewProductComponent extends UpdateProduct implements OnInit {

  constructor(protected productService: ProductService,
              protected router: Router) {
    super(productService, router);
  }

  ngOnInit() {}
}
