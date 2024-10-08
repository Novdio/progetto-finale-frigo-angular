import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormSigninComponent } from './form-signin/form-signin.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { RegistrationSuccesfullComponent } from './registration-succesfull/registration-succesfull.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: FormLoginComponent },
  { path: 'signin', component: FormSigninComponent },
  { path: 'confirmation/:token', component: ConfirmationPageComponent },
  {
    path: 'registrationSuccessfull',
    component: RegistrationSuccesfullComponent,
  },
  { path: 'agenda', component: AgendaComponent },
  { path: 'profile', component: ProfileComponent },
];
