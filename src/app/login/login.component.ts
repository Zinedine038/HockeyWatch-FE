import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login';
import { JwtAuth } from '../models/jwtAuth';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  title = 'Login';
  constructor(private authenticationService: AuthenticationService) {}
  loginDto = new Login();
  jwtAuth = new JwtAuth();
  
  login(loginDto: Login) {
    this.authenticationService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwt', jwtDto.token)
    });
  }
}
