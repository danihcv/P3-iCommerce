import { Component, OnInit } from '@angular/core';
import {UpdateProduct} from '../update-product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'edit-product',
  templateUrl: '../update-product.html'
})
export class EditProductComponent extends UpdateProduct implements OnInit {

  constructor(protected productService: ProductService,
              protected router: Router,
              private route: ActivatedRoute) {
    super(productService, router);

  this.route.params.subscribe(params => {
    this.productService.getProduct(+params['id']).subscribe((data: Product) => {
      this.name = data.name;
      this.description = data.description;
      this.image = data.image;
      this.category = data.category;
      this.price = data.price;
      this.stock = data.stock;
    });
  });
  }

  ngOnInit() {}

}
