import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  url = 'http://localhost:8000/api';

  constructor(private http: Http) {}

  getProduct(id: number) {
    return this.http.get(this.url + '/products/' + id)
      .map((res:Response) => res.json());
  }

  getCategoryList() {
    return this.http.get(this.url + '/search/category')
      .map( (res: Response) => res.json());
  }

  createProduct(obj) {
    return this.http.post(this.url + '/products', obj)
      .map((res: Response) => res.json());
  }

  getObjectsByName(name: string) {
    return this.http.get(this.url + '/search/name/' + name)
      .map((res: Response) => res.json());
  }

  getCategories() {
    return this.http.get(this.url + '/allCategories/5')
      .map((res: Response) => res.json());
  }

  getNewerProducts() {
    return this.http.get(this.url + '/allProducts/5')
      .map((res: Response) => res.json());
  }
}
