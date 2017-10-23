import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html'
})
export class RegisterUserComponent implements OnInit {
  cep: number;
  number: number = null;
  details = '';
  address = {
    'state': undefined,
    'city': undefined,
    'neighborhood': undefined,
    'street': undefined
  };

  isCEPValid;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  checkCEP() {
    this.userService.getCEP(this.cep)
      .subscribe((data) => {
        this.isCEPValid = true;
        this.address.state = data.estado;
        this.address.city = data.cidade;
        this.address.neighborhood = data.bairro;
        this.address.street = data.logradouro;
      },
      () => this.isCEPValid = false
      );
  }

  resetData() {
    this.isCEPValid = undefined;
    for (const k in this.address) {
      this.address[k] = undefined;
    }
  }

  submit() {
    if (!this.isCEPValid) {
      alert('Revise o CEP informado!');
    } else if (this.number === null) {
      alert('Informe o número da residência');
    } else if (this.details === '') {
      alert('Informe o tipo de residência e/ou detalhes adicionais');
    }
  }
}
