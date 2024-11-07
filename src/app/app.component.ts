import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { ElementService } from './element.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  constructor(public elementService: ElementService, private router: Router) {
    elementService.renderTopBar = true;

    this.router.events.pipe(
      filter((event) : event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      elementService.renderTopBar=true;
    });

  }

  

  title = 'Developer Profile';
}
