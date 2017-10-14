import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itempricing',
  templateUrl: './itempricing.component.html',
  styleUrls: ['./itempricing.component.css']
})
export class ItempricingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  pricetypes =[];
  disabledPriceTypes;
  newPriceType;

  onEditPriceType(index){
    // if (index != "-1"){
    //     this.updateuser= true;
    //     this.prevloginID = this.usersList[index].loginID;
    //     this.loginID= this.usersList[index].loginID;
    //     this.password = this.usersList[index].password;
    //     this.adminRole = this.usersList[index].adminRole;
    //     this.billerRole = this.usersList[index].billerRole;
    //     this.enable = this.usersList[index].enable;
    //   }
    //   else{
    //     this.updateuser= false;
    //     this.prevloginID = "";
    //     this.loginID="";
    //     this.password ="";
    //     this.adminRole = false;
    //     this.billerRole = false;
    //     this.enable = false;
    //   }
  }
}
