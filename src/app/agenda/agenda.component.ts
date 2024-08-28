import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CenaComponent } from '../cena/cena.component';
import { ColazioneComponent } from '../colazione/colazione.component';
import { FaccineComponent } from '../faccine/faccine.component';
import { MerendaComponent } from '../merenda/merenda.component';
import { Calendar } from '../model/Calendar';
import { PranzoComponent } from '../pranzo/pranzo.component';
import { CalendarService } from '../services/calendar.service';
import { SpuntinoComponent } from '../spuntino/spuntino.component';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ColazioneComponent,
    SpuntinoComponent,
    PranzoComponent,
    MerendaComponent,
    CenaComponent,
    FaccineComponent,
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
