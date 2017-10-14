import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-itemsmapping',
  templateUrl: './itemsmapping.component.html',
  styleUrls: ['./itemsmapping.component.css']
})
export class ItemsmappingComponent implements OnInit {

  mastercategoriesList;
  mastersubcategoriesList;
  masterItemsList;

  subcat_disable_status = [];
  item_disable_status = [];

  categoryindex;
  subcategoryindex;

  selectedItems:string[]=[];

  catradioselection=[];
  subcatradioselection = [];
  itemcheckboxselection=[];

  itemMappedStringsJson = [];


  

  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.getMasterItemslistfromDB();
    this.getItemsMappinglistfromDB();
  }

  getMasterItemslistfromDB(){
    
    const businessID= this.authservice.getStoredValue("businessID");
    let self = this;
    firebase.database().ref('Business/'+businessID+'/Items/').once('value')
    .then(function(snapshot) {
      self.mastercategoriesList = snapshot.val().masterCategories.split(',');
      self.mastersubcategoriesList = snapshot.val().masterSubCategories.split(',');
      self.masterItemsList = snapshot.val().masterItems.split(',');
      console.log(self.mastercategoriesList);
        })
    .catch(
            error => console.log(error)
          )
  }

  onAddItemsMapping(){
    var newrecord = true;
    
    //if categorya nd subcategory are same as selected before, just update the items in the old record,
    //else create new record
    for(var i=0;i<this.itemMappedStringsJson.length; i++){
        if (this.itemMappedStringsJson[i].Category == this.mastercategoriesList[this.categoryindex]){
          if(this.itemMappedStringsJson[i].Subcategory == this.mastersubcategoriesList[this.subcategoryindex]){
            this.itemMappedStringsJson[i].Items = this.selectedItems.toString();
             newrecord= false;
             break;
          }
        }
    }
      if(newrecord){
        this.itemMappedStringsJson.push({
          Category:this.mastercategoriesList[this.categoryindex],
          Subcategory:this.mastersubcategoriesList[this.subcategoryindex],
          Items:this.selectedItems.toString()
        });
      }
      this.selectedItems=[];
      this.catradioselection=[];
      this.subcatradioselection = [];
      this.itemcheckboxselection=[];
    }

  removeMappedString(i){
    
    this.catradioselection=[];

    var sc= this.itemMappedStringsJson[i].Subcategory;
    var cat=this.itemMappedStringsJson[i].Category;

    this.catradioselection[this.mastercategoriesList.indexOf(cat)] = false;
    this.subcat_disable_status[this.mastersubcategoriesList.indexOf(sc)] = false;
    this.subcatradioselection[this.mastersubcategoriesList.indexOf(sc)] = false;

    //Items
    var itemsArray = this.itemMappedStringsJson[i].Items.split(',');

    for(var j=0;j<itemsArray.length;j++){
      this.item_disable_status[this.masterItemsList.indexOf(itemsArray[j])]= false;
      this.itemcheckboxselection[this.masterItemsList.indexOf(itemsArray[j])]=false;
      //this.selectedItems.splice(this.selectedItems.indexOf(itemsArray[j]),1);
    }
    this.itemMappedStringsJson.splice(i,1);
    this.selectedItems=[];

  }

  onClickItemMapping(type, i){    

    if(type == "category"){
      this.categoryindex=i;
      this.selectedItems=[];
      

      for(var j=0; j<this.itemMappedStringsJson.length;j++){
        var indx = this.mastersubcategoriesList.findIndex((subcategory)=>(subcategory) 
                      == this.itemMappedStringsJson[j].Subcategory);
        if( indx == -1 ){
          //Do nothing..it is a new category selection
        }else if(this.mastercategoriesList[this.categoryindex]==this.itemMappedStringsJson[j].Category){
          //already mapped category- if the selected category and subcategory are part of same group,
          //then enable sub category radio button, keep it selected, else disable the subcategory and 
          //deselct the sub category radio button

          this.subcat_disable_status[indx] = false; 
          this.subcatradioselection[indx]=true;
          this.onClickItemMapping("subcategory", indx);
        }
        else{
          this.subcat_disable_status[indx] = true;
          this.subcatradioselection[indx]=false;
        }
      }
    }
    else if(type == "subcategory"){
      this.subcategoryindex=i;
      for(var j=0;j<this.itemMappedStringsJson.length; j++){

        var itemsArray = this.itemMappedStringsJson[j].Items.split(',');
        for(var k=0;k<itemsArray.length;k++){
          var Itemindx = this.masterItemsList.findIndex((item)=>(item)==itemsArray[k]);

          if(Itemindx== -1){
            //do nothing..
          }else if(this.mastersubcategoriesList[this.subcategoryindex] == 
                    this.itemMappedStringsJson[j].Subcategory){
                                        this.item_disable_status[Itemindx]= false;
                                        this.itemcheckboxselection[Itemindx]=true;
                                        this.selectedItems.push(this.masterItemsList[Itemindx]);
          }else {
                  this.item_disable_status[Itemindx]= true;
                  this.itemcheckboxselection[Itemindx]=false;
          }

        }
      }
    }
    else if(type == "items"){
      if (this.selectedItems.find((selecteditem)=>(selecteditem == this.masterItemsList[i])) == undefined){
        this.selectedItems.push(this.masterItemsList[i]);
      }
      else{ //means item already selected, now it is de-selected, so to be removed from the array
        this.selectedItems.splice(this.selectedItems.indexOf(this.masterItemsList[i]),1);
      }
    }
  }

  onClickMappedString(i){
    this.catradioselection =[];
    var cat= this.itemMappedStringsJson[i].Category;
    this.catradioselection[this.mastercategoriesList.indexOf(cat)] = true;
    this.onClickItemMapping("category", this.mastercategoriesList.indexOf(cat));
  }

  saveItemsMappingstoDB(){
    const businessID= this.authservice.getStoredValue("businessID");
    if (businessID!=""){
      const database= firebase.database().ref('Business/'+businessID+'/ItemsMapping/')
      .set(this.itemMappedStringsJson)
        .then(
          ()=>{}
        )
        .catch(
              error => {
                console.log(error);
            }
        )
    }
  }

  getItemsMappinglistfromDB(){
    
    const businessID= this.authservice.getStoredValue("businessID");
    let self = this;
    firebase.database().ref('Business/'+businessID+'/ItemsMapping/').once('value')
    .then(function(snapshot) {
      self.itemMappedStringsJson = snapshot.val();
      if(self.itemMappedStringsJson == null) {self.itemMappedStringsJson=[]}
      console.log(self.itemMappedStringsJson);
        })
    .catch(
            error => console.log(error)
          )
  }
}
