import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SkaterService {

  constructor(private httpClient: HttpClient) {  }
  getAllSkaters() {
    this.httpClient.get('https://localhost:7067/api/skater')
      .subscribe(data => {
        return data;
      });;
  }

  getSkatersByTeam(id: number) {
    this.httpClient.get('https://localhost:7067/api/skater/team' + {id})
      .subscribe(data => {
        return data;
      });;
  }
}
