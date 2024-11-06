import { Component } from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { SkaterService } from '../skater.service';
import { TeamService } from '../team.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [NgIf,
    NgOptimizedImage,
    NgForOf],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})


export class PlayerListComponent {

  skaters: any;
  teams: any;
  combined: any;

  constructor(private skaterService: SkaterService, private teamService: TeamService) { }

  ngOnInit() {
    this.loadSkaters();
  }

  async loadSkaters () {

    forkJoin({
      skaters: this.skaterService.getAllSkaters(),
      teams: this.teamService.getTeamsPlain()
    }).subscribe({
      next: ({skaters, teams}) => {
        this.skaters = skaters;
        this.teams = teams;
        //use combined array sort players under teams
        this.combined = this.teams.map((team: { id: any; }) => {
          return {
            ...team,
            players: this.skaters.filter((skater: { teamId: any; }) => skater.teamId === team.id)
          }
        });
        console.log(this.combined);
      },
      error: error => console.log(error)
    });

  }
}
