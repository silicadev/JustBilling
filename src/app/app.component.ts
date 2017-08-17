import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    firebase.initializeApp ({
      apiKey: "AIzaSyDQlakpcqOHmdqDDODKdzEZB4Pm-RVMd9Y",
      authDomain: "just-billing-759d2.firebaseapp.com",
      databaseURL:"just-billing-759d2.firebaseio.com"
    });
  }
}
