import { Component } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
