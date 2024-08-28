import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'any'   // root injecta in app e ne crea uno che viene passato a tutti i comp || any lo injecta direttamente nel comp - uno nuovo per ogni comp
})
export class StompService 
{
  private socket: any;
  private stompClient: any;

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(): void {
    this.socket = new SockJS('http://localhost:8080/websocket'); //mappatura in spring
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.debug = null;

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      // console.log('Connected: ' + frame);
    }, function(error: any) {
      console.error('Error: ' + error);
    });
  }

  subscribe(topic: string, callback: (message: any) => void): void {
    const _this = this;
    if (this.stompClient.connected) {
      this.subscribeToTopic(topic, callback);
    } else {
      this.stompClient.connect({}, function () {
        _this.subscribeToTopic(topic, callback);
      });
    }
  }

  private subscribeToTopic(topic: string, callback: (message: any) => void): void {
    this.stompClient.subscribe(topic, (message: any) => {
      // console.log('Received message: ' + message.body);
      callback(message.body);
    });
  }

  send(destinazione: string, playload: string)
  {
    this.stompClient.publish({destinazione: "/ws/"+destinazione, body: playload})
  }
}