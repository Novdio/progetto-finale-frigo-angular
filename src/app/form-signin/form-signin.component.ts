import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-signin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './form-signin.component.html',
  styleUrl: './form-signin.component.css'
})
export class FormSigninComponent {
  constructor( private authSev:AuthService, private router: Router){}

  formSignin:FormGroup = new FormGroup
  (
    {
      username:new FormControl("", [Validators.required]),
      password:new FormControl("", [Validators.required,Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$')]),
      email:new FormControl("", [Validators.required])
      //confirmPassword: new FormControl("", [Validators.required])
    }
  )
  // passwordMatchValidator(form: FormGroup) {
  //   return form.get('password')!.value === form.get('confirmPassword')!.value
  //     ? null : { mismatch: true };
  // }

  // onSubmit() {
  //   if (this.formSignin.valid) {
  //     console.log('Form Submitted!', this.formSignin.value);
  //   }
  // }

  signinUser()
  {
    this.authSev.signIn(this.formSignin.value.username,this.formSignin.value.password,this.formSignin.value.email).subscribe
    (
      resp=>this.router.navigate(["registrationSuccessfull"])
    )
  }
  

  // signinUser() {
  //   if (this.formSignin.valid) {
  //     const { username, password } = this.formSignin.value;
  //     this.authSev.signIn(username, password).subscribe({
  //       next: data => {
  //         // Registrazione avvenuta con successo, ora esegui il login automatico
  //         this.authSev.signIn(username, password).subscribe({
  //           next: loginData => {
  //             localStorage.setItem("token", loginData.accessToken);
  //             localStorage.setItem("role", loginData.role);
  //             console.log('Login Successful!', loginData);
  //             // Reindirizza l'utente alla pagina desiderata
  //             this.router.navigate(['']); // Assicurati di utilizzare il percorso corretto
  //           },
  //           error: loginError => {
  //             console.error('Login failed', loginError);
  //           }
  //         });
  //       },
  //       error: err => {
  //         console.error('Registration failed', err);
  //       }
  //     });
  //   }
  // }
}
  

