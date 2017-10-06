import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {PurchaseModel} from '../../models/purchase.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  newProducts: Product[] = [];
  topLatestPurchases: PurchaseModel[] = [];

  constructor(private productService: ProductService) {
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
  }

  ngOnInit() {}

  getProductName(item) {
    let name = 'None';
    this.productService.getProduct(item)
      .subscribe((data: Product) => {
      name = data.name;
      console.log(name);
    });
    return name;
  }
}
