import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoginComponent {

  title = 'Login';
  constructor(private authenticationService: AuthenticationService) {}
  loginDto = new Login();
  
  login(loginDto: Login) {
    this.authenticationService.login(loginDto);
  }
}
