import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Router} from '@angular/router';

import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-masteritemlist',
  templateUrl: './masteritemlist.component.html',
  styleUrls: ['./masteritemlist.component.css']
})
export class MasteritemlistComponent implements OnInit {

  constructor(private authservice:AuthService, private http:Http, private router:Router) { }
  successmessage;
  errorMessage;
  mastercategoriesList;
  mastersubcategoriesList;
  masterItemsList;
  
  

  ngOnInit() {
    console.log("OnInit");
    this.getMasterItemslistfromDB();
  }

  getMasterItemslistfromDB(){
    
    const businessID= this.authservice.getStoredValue("businessID");
    let self = this;
    firebase.database().ref('Business/'+businessID+'/Items/').once('value')
    .then(function(snapshot) {
      self.mastercategoriesList = snapshot.val().masterCategories;
      self.mastersubcategoriesList = snapshot.val().masterSubCategories;
      self.masterItemsList = snapshot.val().masterItems;
        })
    .catch(
            error => console.log(error)
          )
  }

  storeMasterItemsinDB(){
    let self = this;
    console.log("Save Items")
    const businessID= this.authservice.getStoredValue("businessID");
  

    console.log("BusinessID:"+ businessID);

    const mastercategories= {
                      businessID:businessID, 
                      masterCategories: this.mastercategoriesList,
                      masterSubCategories:this.mastersubcategoriesList,
                      masterItems:this.masterItemsList
                    };

    if(businessID!=""){
        const database= firebase.database().ref('Business/'+businessID+'/Items/')
          .set(mastercategories)
            .then(
              ()=>{
                    self.successmessage="User Data Updated Successfully!!!"
              }
            )
            .catch(
                  error => {
                    console.log(error);
                    self.errorMessage=error;
                }
            )
          }
  }
}

