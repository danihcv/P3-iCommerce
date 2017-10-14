import {Product} from './product.model';

export class PurchaseModel {
  id: number;
  idUser: number;
  totalPrice: number;
  date: Date;
  ostentacaoCount: number;
  products: any[];


  constructor(id: number, idUser: number, totalPrice: number, date: Date, ostentacaoCount: number, products: any[]) {
    this.id = id;
    this.idUser = idUser;
    this.totalPrice = totalPrice;
    this.date = date;
    this.ostentacaoCount = ostentacaoCount;
    this.products = products;
  }
}
