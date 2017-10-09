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
