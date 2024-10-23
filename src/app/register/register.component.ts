import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title = 'Login/Register';
  loginDto = new Login();
  registerDto = new Register();

  constructor(private authenticationService: AuthenticationService) {}
  register(registerDto: Register) {
    this.authenticationService.register(registerDto);
  }

  login(loginDto: Login) {
    this.authenticationService.login(loginDto);
  }
}
