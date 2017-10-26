import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../models/user.model';
import {PurchaseModel} from '../models/purchase.model';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  private networkUrl = 'https://the-dank-network.herokuapp.com/api';
  private url = 'http://localhost:8000/api';
  user: User;

  constructor(private http: Http,
              private cookieService: CookieService,
              private router: Router) {}

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
    headers.append('Authorization', token);
  }

  loginByToken(token: string) {
    this.getUserFromNetwork(token)
      .subscribe((netUser) => this.setLoggedUser(netUser), (err) => this.cookieService.delete('token'));
  }

  getUser(username: string) {
    return this.http.get(this.url + '/user/' + username)
      .map((res: Response) => res.json());
  }

  setLoggedUser(obj: any, updateToken?: boolean) {
    if (updateToken) {
      console.log(obj['token_type'] + obj['access_token']);
      this.cookieService.set('token', obj['token_type'] + ' ' + obj['access_token']);
    }
    this.getUser(obj.username)
      .subscribe((user: User) => this.user = user,
        (err) => {
          this.http.post(this.url + '/user', {'username': obj.username})
            .map((res: Response) => res.json())
            .subscribe((user: User) => this.user = user,
              (errr) => this.cookieService.delete('token'));
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

  hasCEP() {
    return this.user.CEP !== null;
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
    this.createAuthorizationHeader(headers, this.cookieService.get('token'));
    this.http.post(this.networkUrl + '/user/post', obj, headers);
  }

  getUserFromNetwork(token: string) {
    const headers = new Headers({ 'Authorization': this.cookieService.get('token')});
    const  options = new RequestOptions({ headers: headers });
    return this.http.get(this.networkUrl + '/user', options)
      .map((res: Response) => res.json());
  }

  updateUser(obj: User) {
    return this.http.put(this.url + '/user/' + obj.username, obj);
  }

  logout() {
    this.cookieService.delete('token');
    this.user = undefined;
    this.router.navigate(['/']);
  }
}
