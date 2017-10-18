export class Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  timesBought: number;
  isAvailable: boolean;

  constructor(id?: number, name?: string, image?: string, description?: string, price?: number, stock?: number, category?: string, timesBought?: number, isAvailable?: boolean) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.timesBought = timesBought;
    this.isAvailable = isAvailable;
  }
}
