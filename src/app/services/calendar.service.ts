import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendar } from '../model/Calendar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  getCalendar(id: number): Observable<Calendar> {
    return this.http.get<Calendar>(`api/calendar/${id}`);
  }

  putCalendar(payload: Calendar): Observable<Calendar> {
    return this.http.put<Calendar>(
      `api/calendar/${parseInt(localStorage.getItem(`id`)!)}`,
      payload
    );
  }
}
