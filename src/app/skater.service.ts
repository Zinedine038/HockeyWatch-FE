import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SkaterService {

  constructor(private httpClient: HttpClient) {  }

  getAllSkaters() : Observable<any> {
    return this.httpClient.get('https://localhost:7067/skater');
  }

  getSkatersByTeam(id: number): Observable<any> {
    return this.httpClient.get('https://localhost:7067/skater/team' + {id});
  }

  getSkatersById(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}`+'skater/'+id+'');
  }
}
