import { Injectable, OnDestroy } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private client!: Client;
  private messageSubject: Subject<string> = new Subject<string>();
  private url: string = 'ws://localhost:8080/ws';

  constructor() {
    this.connect();
  }

  private connect() {
    console.log('Connecting to WebSocket...');
    this.client = new Client({
      brokerURL: this.url,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected');
        this.client.subscribe('/topic/greetings', (message: Message) => {
          this.messageSubject.next(message.body);
        });
      },
      onStompError: (error) => {
        console.error('WebSocket error:', error);
      }
    });

    this.client.activate();
  }

  sendMessage(message: any) {
    this.client.publish({ destination: '/app/hello', body: message });
  }

  get messages(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  ngOnDestroy() {
    this.client.deactivate();
  }
}