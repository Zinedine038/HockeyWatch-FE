import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  getTeams(): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}`+'team/conferences');
  }

  getTeamInfo(id: number): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}`+'team/'+id+'/skaters');
  }
}
