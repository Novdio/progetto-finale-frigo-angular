import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private authService:AuthService){}

  signin()
  {
    let username = '';
    let password = '';

    this.authService.signIn(username,password).subscribe(
        {
          next:data => 
          {
            localStorage.setItem("token",data.accessToken);
            localStorage.setItem("role",data.role);
          },
          error:data =>
          {

          }
        }
    )
  }
}
