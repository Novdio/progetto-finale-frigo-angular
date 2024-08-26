import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-monitoraggio-salute',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './monitoraggio-salute.component.html',
  styleUrl: './monitoraggio-salute.component.css'
})
export class MonitoraggioSaluteComponent {

}
