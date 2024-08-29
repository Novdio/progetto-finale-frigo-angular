import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css',
})
export class FormLoginComponent {
  constructor(private authSev: AuthService, private router: Router) {}

  formLogin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.[a-z])(?=.[A-Z])(?=.*d).{8,}$'),
    ]),
  });

  loginUser() {
    this.authSev
      .login(this.formLogin.value.username, this.formLogin.value.password)
      .subscribe({
        next: (data) => {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('role', data.role);

          localStorage.setItem('username', this.formLogin.value.username);
          localStorage.setItem('email', data.email);
          localStorage.setItem('id', data.id);

          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login error:', err);
        },
      });
  }
}
