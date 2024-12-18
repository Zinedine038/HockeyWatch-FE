import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EditTeamDto } from './models/editTeamDto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private httpClient: HttpClient) {}

  getTeams(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}` + 'team/conferences');
  }

  getTeamsPlain(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}` + 'team/plain');
  }

  getTeamInfo(id: number): Observable<any> {
    return this.httpClient.get(
      `${environment.apiUrl}` + 'team/' + id + '/skaters',
    );
  }

  editTeam(teamId: number, dto: EditTeamDto) {
    return this.httpClient.patch(
      `${environment.apiUrl}` + 'team/update/' + teamId,
      dto,
    );
  }
}
