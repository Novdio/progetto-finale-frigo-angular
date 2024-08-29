import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IaRequest } from '../model/IaRequest';

@Injectable({
  providedIn: 'root',
})
export class IaService {
  private apiUrl = '/api/fairicetta';
  constructor(private http: HttpClient) {}

  sendRicettaRequest(question: string): Observable<IaRequest> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const dto: IaRequest = {
      question: question,
    };

    return this.http.post<IaRequest>(this.apiUrl, dto, { headers: headers });
  }
  sendSecondaRicettaRequest(question: string): Observable<IaRequest> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const dto: IaRequest = {
      question: question,
    };

    return this.http.post<IaRequest>(this.apiUrl, dto, { headers: headers });
  }
  sendTerzaRicettaRequest(question: string): Observable<IaRequest> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const dto: IaRequest = {
      question: question,
    };

    return this.http.post<IaRequest>(this.apiUrl, dto, { headers: headers });
  }
  sendQuartaRicettaRequest(question: string): Observable<IaRequest> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const dto: IaRequest = {
      question: question,
    };

    return this.http.post<IaRequest>(this.apiUrl, dto, { headers: headers });
  }

  getConsigliaRicetta(): Observable<string[]> {
    return this.http.get<string[]>(`/api/consigliaricetta`);
  }
}
