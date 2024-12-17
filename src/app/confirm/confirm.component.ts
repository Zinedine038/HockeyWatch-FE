import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit{

  authenticationService = inject(AuthenticationService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    //get query param guid
    this.route.queryParams
    .subscribe(params => {
      return this.authenticationService.confirm(params['guid']);
    });
  }

}
