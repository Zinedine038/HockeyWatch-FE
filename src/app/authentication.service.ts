import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Register} from "./models/register";
import { Login } from "./models/login";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  registerUrl = "register"
  loginUrl = "login"

  constructor(private http: HttpClient, private router: Router) {

  }

  public register(user: Register){
    return this.http.post(`${environment.apiUrl}${this.registerUrl}`, user).subscribe();
  }

  public login(user: Login){
    return this.http.post(`${environment.apiUrl}${this.loginUrl}`, user).subscribe((response: any) => {
      const token = response.accessToken;
      if(token){
        localStorage.setItem('authToken', token);
        //redirect to dashboard
        this.router.navigate(['/home']);
      }
    });
  }
}
