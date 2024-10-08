import { P } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router: Router) { }

  login(username:string,password:string)
  {
    this.logout();
    let body = {'username':username,'password':password}
    return this.http.post<any>("/api/auth/login",body)
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    this.router.navigate(["/"])
  }

  isLogged():boolean
  {
    if(localStorage.getItem("token"))
      return true;
    else 
      return false;
  }
  getUserRole()
  {
    return localStorage.getItem("role");
  }

  userHasRole(role:string)
  {
    return this.isLogged() && this.getUserRole()==role;
  }

  signIn( username:string,password:string,email:string)
  {
    let body = {'username':username,'password':password,'email':email}
    return this.http.post("/api/auth/register",body,{ responseType: 'text' })
  }

}
