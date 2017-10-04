import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  newProducts: Product[] = [];

  constructor(private productService: ProductService) {
    productService.getCategories()
      .subscribe((data: string[]) => {
        this.categories = data;
    });

    productService.getNewerProducts().subscribe((data: Product[]) => {
      this.newProducts = data;
    });
  }

  ngOnInit() {}

}
