import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  url = 'http://localhost:8000/api';

  constructor(private http: Http) {}

  getProduct(id: number) {
    return this.http.get(this.url + '/product/' + id)
      .map((res:Response) => res.json());
  }

  getCategoryList() {
    return this.http.get(this.url + '/allCategories')
      .map( (res: Response) => res.json());
  }

  createProduct(obj) {
    return this.http.post(this.url + '/product', obj)
      .map((res: Response) => res.json());
  }

  getObjectsByName(name: string) {
    return this.http.get(this.url + '/search/name/' + name)
      .map((res: Response) => res.json());
  }

  getCategories(count) {
    return this.http.get(this.url + '/allCategories/' + count)
      .map((res: Response) => res.json());
  }

  getNewerProducts(count) {
    return this.http.get(this.url + '/allProducts/' + count)
      .map((res: Response) => res.json());
  }

  getTopLatestPurchases(id) {
    return this.http.get(this.url + '/latestPurchases/' + id + '/5')
      .map((res: Response) => res.json());
  }
}
