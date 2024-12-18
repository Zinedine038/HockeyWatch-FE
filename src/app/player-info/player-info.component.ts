import { Component, inject } from '@angular/core';
import { SkaterService } from '../skater.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamService } from '../team.service';
import { LogoService } from '../logo.service';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.css',
})
export class PlayerInfoComponent {
  authenticationService = inject(AuthenticationService);
  skaterService = inject(SkaterService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);
  teamService = inject(TeamService);
  logoService = inject(LogoService);

  id?: number;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      return this.loadPlayer(params['id']);
    });
  }

  player: any;

  async loadPlayer(id: number) {
    await this.skaterService.getSkatersById(id).subscribe({
      next: (player) => {
        this.player = player;
        this.teamService.getTeamInfo(player.teamId).subscribe({
          next: (team) => {
            this.player.team = team;
          },
          error: (error) => console.log(error),
        });
      },
      error: (error) => console.log(error),
    });
  }

  editPlayer(){
    this.router.navigate(['/edit-player'], { queryParams: { id: this.player.id } });
  }
}
