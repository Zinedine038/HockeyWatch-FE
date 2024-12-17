import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  router = inject(Router);
  renderTopBar = true;
  hiddenTopBarRoutes = ['/','/login', '/register', '/confirm', '/post-registration'];

  constructor(){}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event: NavigationEnd) => {
        const currentPath = event.urlAfterRedirects.split('?')[0];
        this.renderTopBar = !this.hiddenTopBarRoutes.includes(currentPath);
      });
  }
  title = 'Developer Profile';
}
