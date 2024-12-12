import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  authenticationService = inject(AuthenticationService);
  private hubConnection: signalR.HubConnection;
  private newMessageSubject = new Subject<any>();
  newMessage$ = this.newMessageSubject.asObservable();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7067/chathub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection.on('ReceiveMessage', (user, message, team) => {
      const fullMessage = `${user}: ${message}`;
      const messageObj = { team, fullMessage };
      this.newMessageSubject.next(messageObj);
    });

    this.hubConnection.start().catch((err) => console.log(err));
  }

  sendMessage(message: string, team: string): void {
    this.hubConnection
      .invoke(
        'SendMessage',
        this.authenticationService.getUserName(),
        message,
        team,
      )
      .catch((err) => console.error(err));
  }
}
