import { Component, OnInit } from '@angular/core';
import {SearchModel} from '../search.model';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-search-category',
  templateUrl: '../search.component.html'
})
export class SearchCategoryComponent extends SearchModel implements OnInit {
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              protected titleService: Title) {
    super(titleService);
    this.type = 'categoria';

    route.params.subscribe(params => {
      this.term = params['term'];

      productService.getProductsByCategory(this.term)
        .subscribe((data: Product[]) => {
          this.products = data;
        });
    });
  }

  ngOnInit() {
  }

}
