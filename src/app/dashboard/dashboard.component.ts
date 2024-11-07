import { Component } from '@angular/core';
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
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  sortedMatches: any[][] = [[], [], []];


  constructor(private matchService: MatchService, public logoService: LogoService, private router: Router) {

  }

  ngOnInit(): void {
    this.matchService.getAllMatches().subscribe({
      next: matches => {
        console.log(matches);
        matches.forEach((match: { status: number; }) => {
          if (match.status === 0) {
            this.sortedMatches[0].push(match);
          } else if (match.status === 1 || match.status === 2 || match.status === 3) {
            this.sortedMatches[1].push(match);
          } else if (match.status === 4) {
            this.sortedMatches[2].push(match);
          }
        });
        console.log(this.sortedMatches);
      },
      error: error => console.log(error)
    });
    
  }

  formatTime(time: string) {
    const date = new Date(time);
    return date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB').slice(0, -3);
  }

  viewMatch(matchId: number){
    this.router.navigate(
      ['/match'],
      { queryParams: {id: matchId} }
    );
  }



}
