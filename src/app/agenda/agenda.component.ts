import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaccineComponent } from '../faccine/faccine.component';
import { Calendar } from '../model/Calendar';
import { CalendarService } from '../services/calendar.service';
import { PastoComponent } from '../pasto/pasto.component';


@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FaccineComponent,
    PastoComponent
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css',
})
export class AgendaComponent {
  calService: CalendarService = inject(CalendarService);
  calendar!: Calendar;

  constructor() {
    this.calService
      .getCalendar(parseInt(localStorage.getItem('id')!))
      .subscribe((data) => {
        this.calendar = data;
        console.log(data);
      });
  }


}
