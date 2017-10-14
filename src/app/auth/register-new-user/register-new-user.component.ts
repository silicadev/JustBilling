import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/Forms';
import * as firebase from 'firebase';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

import {AuthService} from '../auth.service';
import {UserInfo} from '../user.model';


@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})
export class RegisterNewUserComponent implements OnInit {

  constructor(private authservice:AuthService, private http:Http, private router:Router) {}

  ngOnInit() {
    this.loadUsers();
  }

    loginID:string="";
    password:string="";
    enable:boolean=false;
    adminRole:boolean=false;
    billerRole:boolean=false;
    updateuser:boolean= false;
    usersList:UserInfo[]=[];
    errorMessage1:string="";
    errorMessage2:string="";
    errorMessage3:Error;
    erroroccurred1:boolean=false;
    erroroccurred2:boolean=false;
    erroroccurred3:boolean=false;
    disabledUserList:boolean = false;
    prevloginID = "";

    noerroroccurred:boolean=false;
    successmessage1:string = "";

  loadUsers(){
      let self = this;
      self.usersList.splice(0, this.usersList.length);

      const businessID= this.authservice.getStoredValue("businessID");
        firebase.database().ref('Business/'+businessID+'/UserInfo/').once('value')
            .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val();
                    self.usersList.push(childData);
                });

                })
            .catch(
                    error => console.log(error)
                  )
    }

  registerOrUpdateUser(){
    let self = this;
    console.log("New User")
    const businessID= this.authservice.getStoredValue("businessID");
    
    this.resetErrorFlags();

    console.log("BusinessID:"+ businessID);

    const loginInfo= {
                      businessID:businessID, 
                      loginID: this.loginID, 
                      password:this.password,  
                      adminRole:this.adminRole,
                      billerRole:this.billerRole,
                      enable:this.enable
                    };

    if ((businessID != "" && this.loginID != "" && this.password!="")
          && (this.adminRole!=false || this.billerRole!=false)) { 
                  const database= firebase.database().ref('Business/'+businessID+'/UserInfo/'+self.loginID)
                        .set(loginInfo)
                          .then(
                            ()=>{
                              self.noerroroccurred=true;
                              self.successmessage1="User Data Updated Successfully!!!"
                              self.loadUsers();
                              self.updateuser= false;
                              self.loginID="";
                              self.password ="";
                              self.resetErrorFlags();

                              if(self.prevloginID != "" && self.prevloginID != self.loginID){
                              firebase.database().ref('Business/'+businessID+'/UserInfo/'+self.prevloginID)
                              .remove();}
                            }
                          )
                          .catch(
                                error => {
                                  console.log(error);
                                  self.errorMessage3=error;
                                  self.erroroccurred3=true;
                                  self.noerroroccurred=false;
                              }
                          )
          
                        }else {
                          self.noerroroccurred=false;
                          if(this.loginID == "" || this.password == ""){
                            self.erroroccurred1=true;
                            console.log("Blank Data not allowed!!!");
                            self.errorMessage1= "USERNAME or PASSWORD Data cannot Blank!!!"
                          }
                          if(this.adminRole==false || this.billerRole==false){
                            self.erroroccurred2=true;
                            console.log("Atleast one role (admin or biller) is a must!!!");
                            self.errorMessage2="Atleast one role (admin or biller) must be selected!!!";
                          }
                        }

  }
  onEditUser(index){
    if (index != "-1"){
        this.updateuser= true;
        this.prevloginID = this.usersList[index].loginID;
        this.loginID= this.usersList[index].loginID;
        this.password = this.usersList[index].password;
        this.adminRole = this.usersList[index].adminRole;
        this.billerRole = this.usersList[index].billerRole;
        this.enable = this.usersList[index].enable;
      }
      else{
        this.updateuser= false;
        this.prevloginID = "";
        this.loginID="";
        this.password ="";
        this.adminRole = false;
        this.billerRole = false;
        this.enable = false;
      }
  }
  
  resetErrorFlags(){
    this.erroroccurred1=false;
    this.erroroccurred2=false;
    this.erroroccurred3=false;

    this.errorMessage3=null;
    this.errorMessage2="";
    this.errorMessage1="";
  }
}
