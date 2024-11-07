import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { MatchService } from '../match.service';
import { LogoService } from '../logo.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  matches: any[] = [];


  constructor(private matchService: MatchService, public logoService: LogoService) {

  }

  ngOnInit(): void {
    this.matchService.getAllMatches().subscribe({
      next: matches => this.matches = matches,
      error: error => console.log(error)
    });
    
  }



}
