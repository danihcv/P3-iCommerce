import { Component, OnInit } from '@angular/core';
import {UpdateProduct} from '../update-product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product.model';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: '../update-product.html'
})
export class EditProductComponent extends UpdateProduct implements OnInit {
  id: number;

  constructor(protected productService: ProductService,
              protected router: Router,
              private route: ActivatedRoute,
              private titleService: Title,
              protected userService: UserService) {
    super(productService, router, userService);
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
        const res = JSON.parse(err._body);
        this.resetErrors();
        for (const k in res) {
          this.gotError[k] = true;
        }
      });
  }
}
