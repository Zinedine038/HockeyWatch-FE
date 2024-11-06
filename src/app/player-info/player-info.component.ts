import { Component } from '@angular/core';
import { SkaterService } from '../skater.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.css'
})
export class PlayerInfoComponent {
  constructor(private skaterService: SkaterService, private route: ActivatedRoute, private location: Location) {

  }

  id?:number

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        return this.loadPlayer(params['id']);
      }
    )
  }

  player: any

  async loadPlayer(id:number) {
    await this.skaterService.getSkatersById(id).subscribe({
        next: player => this.player=player,
        error: error => console.log(error)
      }
    );
  }

}
