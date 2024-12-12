import { Component, inject, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { TeamService } from '../team.service';
import { ChatService } from '../chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-info',
  standalone: true,
  imports: [NgIf, NgOptimizedImage, NgForOf, FormsModule, ReactiveFormsModule],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.css',
})
export class TeamInfoComponent implements OnInit {
  teamService = inject(TeamService);
  chatService = inject(ChatService);
  route = inject(ActivatedRoute);
  location = inject(Location);

  message = new FormControl('');

  user = '';
  messages: string[] = [];
  team: any;
  id?: number;

  onSubmit(): void {
    const newMessage = this.message.value;
    if (!newMessage) {
      console.log('no message');
      return;
    }
    this.chatService.sendMessage(newMessage, this.team.shortName);
    this.message.setValue('');
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      return this.loadTeam(params['id']);
    });

    this.chatService.newMessage$.subscribe((message) => {
      if (message.team == this.team.shortName) {
        this.messages.push(message.fullMessage);
      }
    });
  }

  async loadTeam(id: number) {
    await this.teamService.getTeamInfo(id).subscribe({
      next: (team) => (this.team = team),
      error: (error) => console.log(error),
    });
  }

  goBack() {
    this.location.back();
  }
}
