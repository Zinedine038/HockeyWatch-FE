import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { ElementService } from './element.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {

  renderTopBar = true;
  hiddenTopBarRoutes = ['/','/login', '/register','/dev-contact','/dev-profile', '/confirm'];

  constructor(public elementService: ElementService, private router: Router){}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        //use event.urlAfterRedirects and filter out query params from it
        const url = event.urlAfterRedirects.split('?')[0];
        this.renderTopBar = !this.hiddenTopBarRoutes.includes(url);
      });
  }
  title = 'Developer Profile';
}
