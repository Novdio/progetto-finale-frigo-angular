import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormSigninComponent } from './form-signin/form-signin.component';

export const routes: Routes = 
[
    {path:"",component:HomeComponent},
    {path:"login",component:FormLoginComponent},
    {path:"signin",component:FormSigninComponent},

];
