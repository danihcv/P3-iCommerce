import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html'
})
export class RegisterUserComponent implements OnInit {
  name: string;
  user: User;
  /*
  cep: number;
  number: number = null;
  details = '';
  */
  address = {
    'state': undefined,
    'city': undefined,
    'neighborhood': undefined,
    'street': undefined
  };

  isCEPValid;

  constructor(private userService: UserService,
              private titleService: Title,
              private router: Router,
              private cookieService: CookieService) {
    this.titleService.setTitle('iCommerce - Registro');
    if (!this.userService.isLogged()) {
      this.router.navigate(['/']);
    } else {
      this.user = this.userService.getLoggedUser();
      /*console.log(u);
      this.cep = u.CEP;
      this.number = u.number;
      this.details = u.complement;*/
      this.checkCEP();
    }
  }

  ngOnInit() {
  }

  checkCEP() {
    this.userService.getCEP(this.user.CEP)
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
    } else if (this.user.number === null) {
      alert('Informe o número da residência');
    } else if (this.user.complement === '') {
      alert('Informe o tipo de residência e/ou detalhes adicionais');
    } else {
      this.userService.updateUser(this.user).subscribe((data) => {
          alert('Dados atualizados com sucesso!');
          this.router.navigate(['']);
        },
          (err) => alert('Erro ao atualizar dados!')
      );
    }
  }
}
