import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getCEP(cep: number) {
    return this.http.get('http://api.postmon.com.br/v1/cep/' + cep)
      .map((res: Response) => res.json());
  }
}
