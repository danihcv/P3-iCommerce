export class User {
  username: string;
  isAdmin: boolean;
  CEP: number;
  number: number;
  complement: string;

  constructor(username: string, isAdmin: boolean, CEP: number, number: number, complement: string) {
    this.username = username;
    this.isAdmin = isAdmin;
    this.CEP = CEP;
    this.number = number;
    this.complement = complement;
  }
}
