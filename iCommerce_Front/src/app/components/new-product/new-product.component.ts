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
  createNewCategory = false;
  newCategory: string = '';

  constructor(private productService: ProductService) {
    productService.getCategoryList().subscribe( (data: string[]) => {
      this.categoryList = data;
    });
  }

  ngOnInit() {}

  submit() {
    this.productService.createProduct({'name': this.name, 'image': this.image, 'description': this.description,
      'price': this.price, 'category': this.createNewCategory ? this.newCategory : this.category, 'stock': this.stock}).subscribe();
  }

  change(data) {
    this.createNewCategory = data.value === '';
    if (data.value === '') {
      this.newCategory = '';
    }
  }
}
