import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {PurchaseModel} from '../../models/purchase.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  newProducts: Product[] = [];
  topProducts: Product[] = [];
  topLatestPurchases: PurchaseModel[] = [];

  constructor(private productService: ProductService,
              private titleService: Title) {
    this.titleService.setTitle('iCommerce - Home');
    productService.getCategories(5)
      .subscribe((data: string[]) => {
        this.categories = data;
    });

    productService.getNewerProducts(5)
      .subscribe((data: Product[]) => {
      this.newProducts = data;
    });

    productService.getTopLatestPurchases(1)
      .subscribe((data: PurchaseModel[]) => {
      this.topLatestPurchases = data;
      });

    productService.getTopRecommendedProducts(5)
      .subscribe((data: Product[]) => {
      this.topProducts = data;
      });
  }

  ngOnInit() {}

}
