import { Component } from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { TeamService } from "../team.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from "@angular/common"

@Component({
  selector: 'app-team-info',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.css'
})
export class TeamInfoComponent {
  constructor(private teamService: TeamService, private route: ActivatedRoute, private location: Location) {

  }

  id?:number

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        return this.loadTeam(params['id']);
      }
    )
  }

  team:any

  async loadTeam(id:number) {
    await this.teamService.getTeamInfo(id).subscribe({
        next: team => this.team=team,
        error: error => console.log(error)
      }
    );
  }

  goBack(){
    this.location.back();
  }
}
