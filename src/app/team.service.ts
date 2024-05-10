import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  getTeams(): Observable<any>{
    return this.httpClient.get('https://localhost:7067/api/team/conferences');
  }

  getTeamInfo(id: number): Observable<any>{
    return this.httpClient.get('https://localhost:7067/api/team/'+id+'/skaters');
  }
}
