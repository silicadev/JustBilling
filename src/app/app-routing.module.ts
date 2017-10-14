
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import { CommonModule } from '@angular/common';

import {HomeComponent} from './home/home.component';
import {NewBusinessSignupComponent} from './auth/signup/NewBusinessSignup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {RegisterNewUserComponent} from './auth/register-new-user/register-new-user.component';
import {MasteritemlistComponent} from './items/masteritemlist/masteritemlist.component'
import { ItemsmappingComponent } from "./items/itemsmapping/itemsmapping.component";



const appRoutes: Routes = [
    {path:'', component: HomeComponent},
    {path:'register', component: NewBusinessSignupComponent},
    {path: 'login', component: SigninComponent},
    {path:'newuser', component:RegisterNewUserComponent},
    {path:'masteritemslist', component:MasteritemlistComponent},
    {path:'itemsmapping', component:ItemsmappingComponent}
    
];
@NgModule({
    //declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
    //providers: [],
})
export class AppRoutingModule {

}
