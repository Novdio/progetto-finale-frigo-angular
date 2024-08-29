import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { StompService } from './services/stomp.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'progetto-frigo-angular';

  constructor(private stompService: StompService) {}

  ngOnInit(): void {
    //devo fare subscribe a topic/alarm/id(utente)
    this.stompService.subscribe('/topic/prova', (message: any) => {
      console.log('arrivata:', message);
    });
  }
}
