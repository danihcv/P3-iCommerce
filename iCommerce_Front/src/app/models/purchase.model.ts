import {Product} from './product.model';

export class PurchaseModel {
  id: number;
  idUser: number;
  totalPrice: number;
  date: Date;
  ostentacaoCount: number;
  products: Product[];


  constructor(id: number, idUser: number, totalPrice: number, date: Date, ostentacaoCount: number, productsIDS: number[]) {
    this.id = id;
    this.idUser = idUser;
    this.totalPrice = totalPrice;
    this.date = date;
    this.ostentacaoCount = ostentacaoCount;
    this.products = [];
    for (let id of productsIDS) {
      this.products.push();
    }
  }
}
