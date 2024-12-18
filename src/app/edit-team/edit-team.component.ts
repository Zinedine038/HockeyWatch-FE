import { Component, inject, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoService } from '../logo.service';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { EditTeamDto } from '../models/editTeamDto';

@Component({
  selector: 'app-edit-team',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css',
})
export class EditTeamComponent implements OnInit {
  teamService = inject(TeamService);
  route = inject(ActivatedRoute);
  logoService = inject(LogoService);
  formBuilder = inject(FormBuilder);
  editTeamDto = new EditTeamDto();
  team: any;

  teamFormGroup = this.formBuilder.group({
    name: [''],
    shortName: [''],
    arena: [''],
  });

  onSubmit() {
    const nameControl = this.teamFormGroup.get('name');
    const shortNameControl = this.teamFormGroup.get('shortName');
    const arenaControl = this.teamFormGroup.get('arena');
    if (nameControl) {
      this.editTeamDto.name = nameControl.value || '';
    }
    if (shortNameControl) {
      this.editTeamDto.shortName = shortNameControl.value || '';
    }
    if (arenaControl) {
      this.editTeamDto.arena = arenaControl.value || '';
    }
    this.teamService.editTeam(this.team.id, this.editTeamDto).subscribe(
      (response) => {
        //reload the page
        window.location.reload();
      },
      (error) => console.log(error),
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.teamService.getTeamInfo(params['id']).subscribe({
        next: (team) => {
          this.team = team;
          this.updateForm();
        },
        error: (error) => console.log(error),
      });
    });
  }

  updateForm() {
    console.log(this.team);
    this.teamFormGroup.patchValue(
      {
        name: this.team.name,
        shortName: this.team.shortName,
        arena: this.team.arena,
      },
      { emitEvent: true },
    );
  }
}
