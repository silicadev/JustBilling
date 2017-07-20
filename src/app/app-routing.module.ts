
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import { CommonModule } from '@angular/common';

import {HomeComponent} from './home/home.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';



const appRoutes: Routes = [
    {path:'', component: HomeComponent},
    {path:'register', component: SignupComponent},
    {path: 'login', component: SigninComponent}
];
@NgModule({
    //declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
    //providers: [],
})
export class AppRoutingModule {

}
