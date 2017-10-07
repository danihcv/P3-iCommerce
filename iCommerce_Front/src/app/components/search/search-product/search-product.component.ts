import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import {SearchModel} from '../search.model';

@Component({
  selector: 'app-search-product',
  templateUrl: '../search.component.html'
})
export class SearchProductComponent extends SearchModel implements OnInit {
  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
    super();
    this.type = 'produto';

    route.params.subscribe(params => {
      this.term = params['term'];

      productService.getObjectsByName(this.term)
        .subscribe((data: Product[]) => {
          this.products = data;
        });
    });
  }

  ngOnInit() {
  }

}
