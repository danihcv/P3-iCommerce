import { Component, OnInit } from '@angular/core';
import {UpdateProduct} from '../update-product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product.model';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-edit-product',
  templateUrl: '../update-product.html'
})
export class EditProductComponent extends UpdateProduct implements OnInit {
  id: number;

  constructor(protected productService: ProductService,
              protected router: Router,
              private route: ActivatedRoute,
              private titleService: Title) {
    super(productService, router);
    this.titleService.setTitle('iCommerce - Editar produto');
    this.action = 'Salvar';

  this.route.params.subscribe(params => {
    this.id = +params['id'];
    this.productService.getProduct(this.id).subscribe((data: Product) => {
      this.name = data.name;
      this.description = data.description;
      this.image = data.image;
      this.category = data.category;
      this.price = data.price;
      this.stock = data.stock;
    });
  });
  }

  ngOnInit() {}

  submit() {
    this.productService.updateProduct({'id': this.id, 'name': this.name, 'image': this.image, 'description': this.description,
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
}
