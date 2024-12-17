import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  displayName: string = '';
  authService = inject(AuthenticationService);

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('displayname');
  }
}
