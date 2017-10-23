import {Product} from '../../models/product.model';
import {Title} from '@angular/platform-browser';

export abstract class SearchModel {
  products: Product[] = [];
  type = '';
  term = '';

  constructor (protected titleService: Title) {
    this.titleService.setTitle('iCommerce - Buscar');
  }
}
