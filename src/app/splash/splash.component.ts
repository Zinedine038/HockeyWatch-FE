import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent {
  constructor(private authenticationService: AuthenticationService) {}
  loginDto = new Login();
  
  login(loginDto: Login) {
    this.authenticationService.login(loginDto);
  }
}
