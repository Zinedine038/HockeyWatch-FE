import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [LoginComponent,RegisterComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  login=true;

  setLogin(val: boolean) {
    this.login=val;
  }
}
