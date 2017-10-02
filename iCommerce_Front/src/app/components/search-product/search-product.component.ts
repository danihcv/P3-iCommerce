import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html'
})
export class SearchProductComponent implements OnInit {
  products: Product[] = [];
  term = '';

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.term = params['term'];
    });
  }

  ngOnInit() {
  }

}
