import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/Forms';
import * as firebase from 'firebase';

import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(private authservice:AuthService) { }

  ngOnInit() {
  }

  OnSignupwithEmail(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    
    console.log(email, password);

    this.authservice.signupUserwithEmail(email, password);
  }

  OnSignupwithPhone (form:NgForm) {
    const phone = form.value.phone;
    //const captcha = form.value.captcha;
    this.recaptchaVerifier = this.authservice.reCaptchaVerify();

    console.log(phone);
    this.authservice.signupUserwithPhone(phone, this.recaptchaVerifier);
    
  }

  verifyOTP(form:NgForm){
    const OTP = form.value.OTP;
    console.log("OTP"+OTP);
    this.authservice.verifySMSCode(OTP);
  }

  OnSignupwithUserID (form:NgForm){
    const userID = form.value.uid;
    const password = form.value.password;
    firebase.auth().
    // firebase.auth().createUser({
    //   uid: userID,
    //   email: password
    // })
    //   .then(function(userRecord) {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log("Successfully created new user:", userRecord.uid);
    //   })
    //   .catch(function(error) {
    //     console.log("Error creating new user:", error);
    //   });
  }
}
