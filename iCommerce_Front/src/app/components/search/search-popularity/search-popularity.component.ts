import { Component, OnInit } from '@angular/core';
import {SearchModel} from '../search.model';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product.model';

@Component({
  selector: 'app-search-popularity',
  templateUrl: '../search.component.html'
})
export class SearchPopularityComponent extends SearchModel implements OnInit {
  constructor(private productService: ProductService) {
    super();
    this.type = 'popularidade';
    this.term = 'decrescente';

    productService.getTopRecommendedProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }

  ngOnInit() {
  }

}
