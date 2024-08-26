import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../services/web-socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone:true,
  imports:[CommonModule],
  template: `
    <h1>Le mie notifiche</h1>
    <div *ngFor="let message of messages">
      {{ message }}
    </div>
  `
})
export class NotificationComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  private messageSubscription!: Subscription;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.messageSubscription = this.webSocketService.messages.subscribe((message) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}