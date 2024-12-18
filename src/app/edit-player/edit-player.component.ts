import { Component, inject, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoService } from '../logo.service';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { EditPlayerDto } from '../models/editPlayerDto';
import { SkaterService } from '../skater.service';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.css',
})
export class EditPlayerComponent implements OnInit {
  playerService = inject(SkaterService);
  teamService = inject(TeamService);
  route = inject(ActivatedRoute);
  logoService = inject(LogoService);
  formBuilder = inject(FormBuilder);
  editPlayerDto = new EditPlayerDto();
  player: any;

  playerFormGroup = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    number: [''],
    weight: [''],
    height: [''],
    goals: [''],
    assists: [''],
    points: [''],
  });

  onSubmit() {
    const firstNameControl = this.playerFormGroup.get('firstName');
    const lastNameControl = this.playerFormGroup.get('lastName');
    const numberControl = this.playerFormGroup.get('number');
    const weightControl = this.playerFormGroup.get('weight');
    const heightControl = this.playerFormGroup.get('height');
    const goalsControl = this.playerFormGroup.get('Goals');
    const assistsControl = this.playerFormGroup.get('Assists');
    const pointsControl = this.playerFormGroup.get('Points');
    if (firstNameControl) {
      this.editPlayerDto.firstName = firstNameControl.value || '';
    }
    if (lastNameControl) {
      this.editPlayerDto.lastName = lastNameControl.value || '';
    }
    if (numberControl) {
      this.editPlayerDto.number = Number(numberControl.value) || 0;
    }
    if (weightControl) {
      this.editPlayerDto.weight = Number(weightControl.value) || 0;
    }
    if (heightControl) {
      this.editPlayerDto.height = Number(heightControl.value) || 0;
    }
    if (goalsControl) {
      this.editPlayerDto.goals = Number(goalsControl.value) || 0;
    }
    if (assistsControl) {
      this.editPlayerDto.assists = Number(assistsControl.value) || 0;
    }
    if (pointsControl) {
      this.editPlayerDto.points = Number(pointsControl.value) || 0;
    }
    this.playerService.editPlayer(this.player.id, this.editPlayerDto).subscribe(
      (response) => {
        //reload the page
        window.location.reload();
      },
      (error) => console.log(error),
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.playerService.getSkatersById(params['id']).subscribe({
        next: (player) => {
          this.player = player;
          this.teamService.getTeamInfo(player.teamId).subscribe({
            next: (team) => {
              this.player.team = team;
              this.updateForm();
            },
            error: (error) => console.log(error),
          });
        },
        error: (error) => console.log(error),
      });
    });
  }

  updateForm() {
    console.log(this.player);
    this.playerFormGroup.patchValue(
      {
        firstName: this.player.firstName,
        lastName: this.player.lastName,
        number: this.player.number,
        weight: this.player.weight,
        height: this.player.height,
        goals: this.player.goals,
        assists: this.player.assists,
        points: this.player.points,
      },
      { emitEvent: true },
    );
  }
}
