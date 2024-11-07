import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  constructor() { }

  getLogoLight(shortTeamName: string) {
    return 'https://assets.nhle.com/logos/nhl/svg/' + shortTeamName + '_light.svg';
  }

  getLogoDark(teamName: string) {
    return 'https://assets.nhle.com/logos/nhl/svg/' + teamName + '_dark.svg';
  }
}
