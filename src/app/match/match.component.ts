import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../match.service';
import { LogoService } from '../logo.service';
import { inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [NgIf, NgOptimizedImage, NgForOf, FormsModule],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export class MatchComponent implements OnInit {
  logoService = inject(LogoService);
  authenticationService = inject(AuthenticationService);
  router = inject(Router);
  match: any;
  caster = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private matchService: MatchService,
  ) {}

  ngOnInit() {
    if(this.authenticationService.getRoles().includes('Caster')){
      this.caster = true;
    }
    this.route.queryParams
      .subscribe(params => {
        return this.loadMatch(params['id']);  
      })

  }

  async loadMatch(id: number) {
    await this.matchService.getMatch(id).subscribe({
      next: (match) => (this.match = match),
      error: (error) => console.log(error),
    });
  }

  goToMatchCasterDashboard() {
    this.router.navigate(['/match-caster-dashboard'], {
      queryParams: { id: this.match.id }
    });  
  }

}
