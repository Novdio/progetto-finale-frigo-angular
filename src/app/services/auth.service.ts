import { P } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

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

  signIn( username:string,password:string)
  {
    let body = {'username':username,'password':password}
    return this.http.post<any>("/api/auth/register",body)
  }

  signlogin(username:string,password:string)
  {
    this.signIn(username,password);
    this.login(username,password);

    return alert("U dit it!")
  }
}
