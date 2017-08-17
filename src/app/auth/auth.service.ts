import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
    
    constructor(private router:Router, private http:Http){}
    
    businessID = "";
    isAuthenticated2 = false;

signinUserwithLoginID(businessID, loginID, password){
    let self = this;
    firebase.database().ref('Business/'+businessID+'/UserInfo/'+loginID).once('value')
        .then(function(snapshot) {
                var dblogin = snapshot.val().loginID;
                var dbPassword = snapshot.val().password;
                  if((dblogin === loginID) && (password === dbPassword)){
                      console.log("Login Successful, Welcome:"+loginID);
                      
                      self.isAuthenticated2= true;
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
      return this.isAuthenticated2;
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

}