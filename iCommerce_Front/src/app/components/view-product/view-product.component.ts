import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html'
})
export class ViewProductComponent implements OnInit {
  product: Product;

  constructor(private router: ActivatedRoute,
              private productService: ProductService) {
    router.params.subscribe((value) => {
      let id = +value['id'];
      productService.getProduct(id).subscribe((data: Product) => {
        this.product = data;
      }, err => console.log('REDIRECIONAR PARA 404!'));
    });
  }

  ngOnInit() {}

}
