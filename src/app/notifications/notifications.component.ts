import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StompService } from '../services/stomp.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  message: string = ''; // Proprietà per memorizzare il messaggio

  constructor(private stompService: StompService) {}

  ngOnInit(): void {
    // Subscribe al topic e aggiorna la proprietà message
    this.stompService.subscribe('/topic/alarm/' + localStorage.getItem("id"), (message: any) => {
      console.log('arrivata:', message);
      this.message = message // Supponiamo che il messaggio sia in message.body
    });
  }

  delete():void
  {
    this.message='';
  }
}
