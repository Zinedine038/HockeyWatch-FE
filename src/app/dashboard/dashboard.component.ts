import { Component, inject } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { MatchService } from '../match.service';
import { LogoService } from '../logo.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  matchService = inject(MatchService);
  logoService = inject(LogoService);
  router = inject(Router);

  sortedMatches: any[][] = [[], [], []];

  ngOnInit(): void {
    this.matchService.getAllMatches().subscribe({
      next: (matches) => {
        this.sortedMatches = matches;
      },
      error: (error) => console.log(error),
    });
  }

  formatTime(time: string) {
    const date = new Date(time);
    return (
      date.toLocaleDateString('en-GB') +
      ' ' +
      date.toLocaleTimeString('en-GB').slice(0, -3)
    );
  }

  viewMatch(matchId: number) {
    this.router.navigate(['/match'], { queryParams: { id: matchId } });
  }
}
