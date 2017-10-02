import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'new-product',
  templateUrl: './new-product.component.html'
})
export class NewProductComponent implements OnInit {
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  stock: number;

  categoryList: string[];

  constructor(private productService: ProductService) {
    productService.getCategoryList().subscribe( (data: string[]) => {
      this.categoryList = data;
    });
  }

  ngOnInit() {}

  submit() {
    this.productService.createProduct({'name': this.name, 'image': this.image, 'description': this.description,
      'price': this.price, 'category': this.category, 'stock': this.stock}).subscribe();
  }
}
