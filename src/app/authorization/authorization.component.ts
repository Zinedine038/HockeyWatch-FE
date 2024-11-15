import { Component } from '@angular/core';
import { OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent implements OnInit{
  
  @Input() roles: string[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService = authenticationService;
    this.router = router;
  }

  public hasRole(role: string): Observable<boolean> {
    return this.authenticationService.isRole(role);
  }
  

  ngOnInit(): void{

    const roleObservables = this.roles.map(role => this.authenticationService.isRole(role));

    forkJoin(roleObservables).subscribe({
      next: (results: boolean[]) => {
        const anyResult = results.some(result => result);
        if (!anyResult) {
          this.router.navigate(['/home']);
        }
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['/home']);
      }
    });

  }
}
