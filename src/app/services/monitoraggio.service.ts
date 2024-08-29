import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoraggioService {

  constructor(private http:HttpClient) { }

  getWeights():Observable<number[]>
  {
    return this.http.get<any>("/api/info/**").pipe(map(response => response.weight));
  }
}
