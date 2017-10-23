import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('iCommerce - Login');
  }

  ngOnInit() {}

}
