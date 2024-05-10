import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { JwtAuth } from '../models/jwtAuth';
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
  jwtAuth = new JwtAuth();

  constructor(private authenticationService: AuthenticationService) {}
  register(registerDto: Register) {
    this.authenticationService.register(registerDto).subscribe();
  }

  login(loginDto: Login) {
    this.authenticationService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwt', jwtDto.token)
    });
  }
}
