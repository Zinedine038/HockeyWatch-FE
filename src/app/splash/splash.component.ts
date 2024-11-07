import { Component, ViewEncapsulation, } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login';
import { AuthenticationService } from '../authentication.service';
import { OnInit } from '@angular/core';
import { ElementService } from '../element.service';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css',
})
export class SplashComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private elementService: ElementService) {}
  loginDto = new Login();

  ngOnInit() {
    this.elementService.renderTopBar = false;
  }
  
  login(loginDto: Login) {
    this.authenticationService.login(loginDto);
  }
}
