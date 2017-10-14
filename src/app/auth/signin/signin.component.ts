import { Component, OnInit, Injectable } from '@angular/core';
import {NgForm} from '@angular/Forms';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';



import * as firebase from 'firebase';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

@Injectable()
export class SigninComponent implements OnInit {

  constructor(private authservice:AuthService, private http:Http, private router:Router) { }
  
  ngOnInit() {
  }
OnSignin(form:NgForm){
    const businessID = form.value.busid;
    const loginID = form.value.loginid;
    const password = form.value.password;
    
    console.log(businessID, loginID, password);

        
    this.authservice.signinUserwithLoginID(businessID, loginID, password);
  }

}
