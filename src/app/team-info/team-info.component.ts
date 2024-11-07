import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { TeamService } from "../team.service";
import { ChatService } from "../chat.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common"
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-info',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf,
    FormsModule
  ],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.css'
})
export class TeamInfoComponent implements OnInit {

  user=''
  message=''
  messages: string[] = [];
  team:any
  id?:number

  constructor(private teamService: TeamService, private route: ActivatedRoute, private location: Location, private chatService: ChatService) {

  }

  sendMessage(): void {
    this.chatService.sendMessage(this.user, this.message);
    this.message = '';
  }


  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        return this.loadTeam(params['id']);
      }
    )

    this.chatService.newMessage$.subscribe(message => {
      this.messages.push(message);
    });
  }


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
