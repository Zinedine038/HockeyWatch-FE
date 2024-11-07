import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common"
import { FormsModule } from '@angular/forms';
import { MatchService } from "../match.service";

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf,
    FormsModule
  ],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent implements OnInit {

  match: any;

  constructor(private route: ActivatedRoute, private location: Location, private matchService: MatchService) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        return this.loadMatch(params['id']);  
      })
  }

  async loadMatch(id: number) {
    await this.matchService.getMatch(id).subscribe({
      next: match => this.match = match,
      error: error => console.log(error)
    });
  }

}
