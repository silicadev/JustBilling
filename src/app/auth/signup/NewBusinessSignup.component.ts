import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/Forms';
import * as firebase from 'firebase';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './NewBusinessSignup.component.html',
  styleUrls: ['./NewBusinessSignup.component.css']
})
export class NewBusinessSignupComponent implements OnInit {
  
  token:string;
  captchaConfirmationResult:any = "";
  recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(private authservice:AuthService, private http:Http, private router:Router) { }

  ngOnInit() {
  }

  signupNewBusiness(form:NgForm){
    let self = this;
    const businessname = form.value.businessname;
    const mobilePhone = form.value.mobilePhone;
    const email = form.value.email;

    const businessID = form.value.busid;
    const loginID= form.value.userid;
    const password = form.value.password;
    const enable:boolean = true;
    const adminRole:boolean= true;
    const billerRole:boolean = true;

    const businessInfo= {
                          businessID:businessID, 
                          businessname:businessname, 
                          mobile:mobilePhone, 
                          email:email,
                          enable:enable};
    
    const loginInfo= {
                      businessID:businessID, 
                      loginID: loginID, 
                      password:password,
                      adminRole:adminRole,
                      billerRole:billerRole, 
                      enable:enable};

    const database= firebase.database();

    if ((businessID != "" && loginID != "" && password!="")){
    database.ref('Business/'+businessID+'/BusinessInfo/').set(businessInfo)
      .then( 
        ()=> {
                console.log("successfully created Business record");
              }
      )
      .catch(
        error => {
                    console.log(error);
                  }
      )

    database.ref('Business/'+businessID+'/UserInfo/'+loginID).set(loginInfo)
            .then (
              ()=> {
                console.log("successfully created a LOGIN record");
                form.reset();
                self.router.navigate(['/login']);
              }
            )
            .catch(
                  error => {
                    console.log(error);
                  }
            )
    }
  }
}
