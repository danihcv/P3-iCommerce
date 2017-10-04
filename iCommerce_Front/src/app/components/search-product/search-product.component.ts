import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html'
})
export class SearchProductComponent implements OnInit {
  products: Product[] = [];
  term = '';

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
    route.params.subscribe(params => {
      this.term = params['term'];
      console.log('mudou');

      productService.getObjectsByName(this.term)
        .subscribe((data: Product[]) => {
          this.products = data;
          console.log(this.products);
        });
    });

  }

  ngOnInit() {
  }

}
