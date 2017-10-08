import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {Product} from '../../models/product.model';

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
  gotError = {};

  constructor(private router: Router,
              private productService: ProductService) {
    productService.getCategoryList().subscribe( (data: string[]) => {
      this.categoryList = data;
    });
  }

  ngOnInit() {}

  resetErrors(key?: string) {
    if (key !== undefined) {
      this.gotError[key] = false;
    } else {
      this.gotError['name'] = false;
      this.gotError['image'] = false;
      this.gotError['description'] = false;
      this.gotError['category'] = false;
      this.gotError['price'] = false;
    }
  }

  submit() {
    this.productService.createProduct({'name': this.name, 'image': this.image, 'description': this.description,
      'price': this.price, 'category': this.createNewCategory ? this.newCategory : this.category, 'stock': this.stock})
      .subscribe(() => this.router.navigate(['']), (err) => {
      let res = JSON.parse(err._body);
      console.log(res);
      this.resetErrors();
      for (let k in res) {
        this.gotError[k] = true;
      }
      });
  }

  change(data) {
    this.createNewCategory = data.value === '';
    if (data.value === '') {
      this.newCategory = '';
    }
  }
}
