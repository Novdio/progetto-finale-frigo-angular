import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // constructor(private http:HttpClient) { }

  // moreInfo(id: number,name: string, surname: string, weight: string, height: string,username: string, email: string, sex: string, age: number )
  // {
  //   let body = {'name':name,'surname':surname,'weight':weight,'height':height,'username':username,'email':email,'sex':sex,'age':age}
    
  //   return this.http.post(`/api/info/${id}`,body,{ responseType: 'text' })
  // }

  constructor(private http: HttpClient) { }

  getUserInfo(id: number): Observable<any> {
    return this.http.get(`/api/info/${id}`);
  }

  createUserInfo(id: number, userInfo: any): Observable<any> {
    return this.http.post(`/api/info/${id}`, userInfo, { responseType: 'text' });
  }

  updateUserInfo(id: number, userInfo: any): Observable<any> {
    return this.http.put(`/api/info/${id}`, userInfo, { responseType: 'text' });
  }
}
