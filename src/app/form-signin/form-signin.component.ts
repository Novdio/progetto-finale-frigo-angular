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
    }
  )

  signinUser()
  {
    this.authSev.signIn(this.formSignin.value.username,this.formSignin.value.password,this.formSignin.value.email).subscribe
    (
      {
        next:data=>
        {
          
          localStorage.setItem("username", this.formSignin.value.username);
          localStorage.setItem("email", this.formSignin.value.email);
          // localStorage.setItem("id", data.id);

          this.router.navigate(["/registrationSuccessfull"])
        },
        error:err=>
        {
          console.error('SignIn error:', err);
        }
      }
    )
  }
  
}
  

