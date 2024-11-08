import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {

  displayName: string = ""

  ngOnInit(): void {
    this.displayName = localStorage.getItem('displayname')?.toUpperCase() || '';
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('displayname');
  }
}
