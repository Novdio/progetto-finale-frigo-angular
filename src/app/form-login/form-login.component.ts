import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {

  constructor( private authSev:AuthService){}

  formLogin:FormGroup = new FormGroup
  (
    {
      username:new FormControl("", [Validators.required]),
      password:new FormControl("", [Validators.required,Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$')]),
    }
  )

  loginUser()
  {
    this.authSev.login(this.formLogin.value.username,this.formLogin.value.password).subscribe
    (
      {
        next:data=>
        {
          localStorage.setItem("token",data.accessToken);//memoria 
          localStorage.setItem("role",data.role);//memoria 
        },
        error:err=>
        {
        }
      }
    )
  }

}
