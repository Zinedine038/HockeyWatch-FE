import { Component } from '@angular/core';
import { TeamService } from "../team.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {


  teams:any;
  constructor(private teamService: TeamService, private router: Router) {
  }

  ngOnInit(){
    this.loadTeams();
  }

  async loadTeams() {
    await this.teamService.getTeams().subscribe({
        next: teams => this.teams=teams,
        error: error => console.log(error)
      }
    );
  }

  viewTeam(teamId: number){
    this.router.navigate(
      ['/team-info'],
      { queryParams: {id: teamId} }
    );
  }

}
