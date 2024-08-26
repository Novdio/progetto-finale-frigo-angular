import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserAdditionalInfo {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  sex: string;
  age: number;
  weight: number[];
  height: number;
  diet: string[];
}

export interface CalendarEvent {
  id: number;
  date: string;  // LocalDate as string (ISO-8601 format)
  checked: boolean;
  meals: string[];
  user: UserAdditionalInfo;
}

@Injectable({
  providedIn: 'root'
})
export class MonitoraggioService 
{

  private baseUrl = 'localhost:8080/api'; // Sostituisci con l'URL reale

  constructor(private http: HttpClient) { }

  getUserAdditionalInfo(id: number): Observable<UserAdditionalInfo> {
    return this.http.get<UserAdditionalInfo>(`${this.baseUrl}/userAdditionalInfo/${id}`);
  }

  getCalendarEvents(userId: number): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(`${this.baseUrl}/calendar/${userId}`);
  }
}
