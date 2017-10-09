import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

export abstract class UpdateProduct {
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

  constructor(protected productService: ProductService,
              protected router: Router) {
    this.resetErrors();
    productService.getCategoryList().subscribe( (data: string[]) => {
      this.categoryList = data;
    });
  }

  abstract submit();

  change(data) {
    this.createNewCategory = data.value === '';
    if (data.value === '') {
      this.newCategory = '';
    }
  }

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
}
