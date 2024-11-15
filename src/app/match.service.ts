import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private httpClient: HttpClient) {

   }

   getAllMatches() : Observable<any> {
    return this.httpClient.get('https://localhost:7067/Match/sortedByStatus');
  }

  getMatch(id: number) : Observable<any> {
    return this.httpClient.get('https://localhost:7067/Match/' + id);
  }

}
