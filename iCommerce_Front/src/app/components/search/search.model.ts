import {Product} from '../../models/product.model';

export abstract class SearchModel {
  products: Product[] = [];
  type: string = '';
  term: string = '';

  constructor () {}
}
