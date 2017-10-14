import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    
    constructor(private router:Router, private http:Http){}
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }
    
    businessID = "";
    isAuthenticated2:boolean = false;
    token = "";
    istokenGenerated2= false;

    signinUserwithLoginID(businessID, loginID, password){
        let self = this;
        // Get a reference to the database service
       
        firebase.database().ref('Business/'+businessID+'/UserInfo/'+loginID).once('value')
                .then(function(snapshot) {
                    var dblogin = snapshot.val().loginID;
                    var dbPassword = snapshot.val().password;
                      if((dblogin === loginID) && (password === dbPassword)){
                          console.log("Login Successful, Welcome:"+loginID);
                          
                          self.isAuthenticated2= true;
                          self.storeValue("isauthenticated", self.isAuthenticated2)
                          self.storeValue("businessID", businessID);
                          self.router.navigate(['/newuser']);
    
                      }
                        else {
                            console.log("Login FAILED, Sorry:"+loginID);
                      }
                })
            .catch(
                    error => console.log(error)
                  )
    }

    isAuthenticated(){
            const isauthenticated =  this.getStoredValue("isauthenticated");
            if((isauthenticated == "true") ? this.isAuthenticated2= true : this.isAuthenticated2=false ){
                return this.isAuthenticated2;}
    }
    isTokenGenerated(){
        const isTokenGenerated =  this.getStoredValue("isTokenGenerated");
        if((isTokenGenerated == "true") ? this.istokenGenerated2= true : this.istokenGenerated2=false ){
            return this.istokenGenerated2;
        }
    }

    storeValue(key, value) {
        if (localStorage) {
            localStorage.setItem(key, value);
         } //else {
        //     document.cookie.(key, value);
        // }
    }

    getStoredValue(key) {
        if (localStorage) {
            return localStorage.getItem(key);
        } //else {
        //     return $.cookies.get(key);
        // }
    }

    signOut(){
        firebase.auth().signOut();
        this.storeValue("isauthenticated", "false")
        this.storeValue("businessID", null);
        this.storeValue("isTokenGenerated", "false");
        this.router.navigate(['']);
    }

    getToken(){
        let self=this;
    
            firebase.auth().currentUser.getIdToken()
                .then(
                    (token:string)=>{
                              self.token=token;
                              }
                );
            return self.token;
        }

    signinUserwithEmail(email:string, password:string) {
        const self = this;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                console.log(response);
                firebase.auth().currentUser.getIdToken()
                    .then(
                        (token:string)=>{
                            self.token=token;
                            self.istokenGenerated2 = true;
                            self.storeValue("isTokenGenerated", self.istokenGenerated2);
                        }
                    )
                }
                )
            .catch(
                error => console.log(error)
            )
    }
}