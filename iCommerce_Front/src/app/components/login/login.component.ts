import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

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

  constructor(private router: Router,
              private titleService: Title,
              private userService: UserService,
              private cookieService: CookieService) {
    this.titleService.setTitle('iCommerce - Login');
  }

  ngOnInit() {}

  submit() {
    this.gotError = false;
    this.userService.login(this.obj).subscribe((netUser) => {
      this.userService.setLoggedUser(netUser, true);
      this.router.navigate(['/']);
    }, (err) => this.gotError = true);
  }
}
