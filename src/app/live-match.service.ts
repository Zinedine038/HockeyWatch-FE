import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class LiveMatchService {

  authenticationService = inject(AuthenticationService);
  private hubConnection: signalR.HubConnection;
  private newUpdateSubject = new Subject<any>();
  newUpdate$ = this.newUpdateSubject.asObservable();
  
  constructor() { 
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7067/matchhub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.on('ReceiveMatchUpdate', (match) => {
      this.newUpdateSubject.next(match);
    });

    this.hubConnection.start()
      .catch(err => console.log(err));
  }

  public startMatch(matchId : number): void {
    this.hubConnection.invoke('ReceiveStartMatch', matchId)
      .catch(err => console.error(err));
  }}
