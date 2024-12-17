import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css',
})
export class ConfirmEmailComponent implements OnInit {
  authService = inject(AuthenticationService);

  tokenNotFound = false;
  wait = false;
  apiError = false;
  userConfirmed = false;

  ngOnInit(): void {
    const token = window.location.search.split('=')[1];
    if (token) {
      this.authService.confirmEmail(token);
    } else {
      this.tokenNotFound = true;
    }
  }
}
