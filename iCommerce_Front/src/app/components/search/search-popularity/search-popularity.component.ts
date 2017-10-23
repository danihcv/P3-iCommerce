import { Component, OnInit } from '@angular/core';
import {SearchModel} from '../search.model';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-search-popularity',
  templateUrl: '../search.component.html'
})
export class SearchPopularityComponent extends SearchModel implements OnInit {
  constructor(private productService: ProductService,
              protected titleService: Title) {
    super(titleService);
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
