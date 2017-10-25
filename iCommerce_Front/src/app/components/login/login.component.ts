import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../services/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  obj = {
    'username': '',
    'password': ''
  };

  gotError = false;

  constructor(private titleService: Title,
              private userService: UserService,
              private cookieService: CookieService) {
    this.titleService.setTitle('iCommerce - Login');
  }

  ngOnInit() {}

  submit() {
    console.log(this.obj);
    this.gotError = false;
    this.userService.login(this.obj).subscribe((netUser) => {
      this.userService.setLoggedUser(netUser);
    }, (err) => this.gotError = true);
  }
}
