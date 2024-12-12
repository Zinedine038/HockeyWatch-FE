import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { LogoService } from '../logo.service';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../match.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-caster-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-caster-dashboard.component.html',
  styleUrl: './match-caster-dashboard.component.css',
})
export class MatchCasterDashboardComponent implements OnInit {
  logoService = inject(LogoService);
  route = inject(ActivatedRoute);
  matchService = inject(MatchService);
  match: any;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      return this.loadMatch(params['id']);
    });
  }

  async loadMatch(id: number) {
    await this.matchService.getMatch(id).subscribe({
      next: (match) => (this.match = match),
      error: (error) => console.log(error),
    });
  }
}
