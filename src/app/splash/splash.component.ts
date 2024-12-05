import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css',
})
export class SplashComponent implements OnInit {
  constructor() {}
  router = inject(Router);

  loginDto = new Login();

  ngOnInit() {
    //after 2.2 seconds redirect to login
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2200);
  }
}
