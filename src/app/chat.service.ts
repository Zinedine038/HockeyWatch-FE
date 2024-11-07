import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private hubConnection: signalR.HubConnection;
  private newMessageSubject = new Subject<string>();
  newMessage$ = this.newMessageSubject.asObservable();
  
  constructor() { 
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7067/chathub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.on('ReceiveMessage', (user, message) => {
      const fullMessage = `${user}: ${message}`;
      this.newMessageSubject.next(fullMessage);
    });

    this.hubConnection.start()
      .catch(err => console.log(err));
  }

  sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }
}
