import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../models/user.model';
import {PurchaseModel} from '../models/purchase.model';

@Injectable()
export class UserService {
  private networkUrl = 'https://the-dank-network.herokuapp.com/api';
  private url = 'http://localhost:8000/api';
  user: User;
/*
  user: User = {
    'username': 'admin',
    'isAdmin': false,
    'CEP': undefined,
    'number': undefined,
    'complement': undefined
  };
*/
  constructor(private http: Http,
              private cookieService: CookieService) {
    this.getUser('admin').subscribe((user) => this.user = user);
  }

  getCEP(cep: number) {
    return this.http.get('http://api.postmon.com.br/v1/cep/' + cep)
      .map((res: Response) => res.json());
  }

  getLoggedUser() {
    return this.user;
  }

  login(user: any) {
    return this.http.post(this.networkUrl + '/login', user)
      .map((res: Response) => res.json());
  }

  createAuthorizationHeader(headers: Headers, token: string) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  loginByToken(token: string) {
    this.getUserFromNetwork(token)
      .subscribe((netUser) => this.setLoggedUser(netUser));
  }

  getUser(username: string) {
    return this.http.get(this.url + '/user/' + username)
      .map((res: Response) => res.json());
  }

  setLoggedUser(obj: any) {
    this.cookieService.set('token_access', obj.token_access);
    this.getUser(obj.username)
      .map((res: Response) => res.json())
      .subscribe((user: User) => this.user = user,
        (err) => {
          this.http.post(this.url + '/user', obj.username)
            .map((res: Response) => res.json())
            .subscribe((user: User) => this.user = user,
              (errr) => this.cookieService.delete('token_acess'));
        });
  }

  isLogged() {
    return this.user !== undefined;
  }

  isAdmin() {
    if (this.isLogged()) {
      return this.user.isAdmin;
    }
    return false;
  }

  ostentar(purchase: PurchaseModel) {
    let obj = {
      'description': 'Saudações, PLEBEUS!\nVenho por meio deste trazer-vos à luz minhas novas aquisições:\n'
    };

    for (let p of purchase.products) {
      obj.description += '\tItem: ' + p.name + '\n' +
                          '\tPreço: ' + p.price + '\n' +
                          '\tQuantidade: ' + p.quantity + '\n' +
                          '-------------------------\n';
    }
    obj.description += 'PREÇO TOTAL: R$ ' + purchase.totalPrice + '\n\nSIM! Sou rico.\nNão me inveje, trabalhe!\n#gratidão';

    const headers = new Headers();
    this.createAuthorizationHeader(headers, this.cookieService.get('token_access'));
    this.http.post(this.networkUrl + '/user/post', obj, headers);
  }

  getUserFromNetwork(token: string) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers, token);
    return this.http.get(this.networkUrl + '/user', headers)
      .map((res: Response) => res.json());
  }

  updateUser(obj: User) {
    return this.http.put(this.url + '/user/' + obj.username, obj);
  }
}
