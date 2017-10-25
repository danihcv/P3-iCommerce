import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

export abstract class UpdateProduct {
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  stock = 0;

  action = '';
  categoryList: string[];
  createNewCategory = false;
  newCategory = '';
  gotError = {};

  constructor(protected productService: ProductService,
              protected router: Router,
              protected userService: UserService) {
    if (!userService.isAdmin()) {
      this.router.navigate(['/']);
    }
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
      this.gotError['stock'] = false;
    }
  }
}
