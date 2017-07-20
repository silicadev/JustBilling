import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/Forms';

import * as firebase from 'firebase';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authservice:AuthService) { }

  ngOnInit() {
  }
OnSignin(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    
    console.log(email, password);

    this.authservice.signinUser(email, password);
  }
}
