import { Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Register} from "./models/register";
import { Login } from "./models/login";
import { Observable, map, catchError, of, throwError } from "rxjs";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { UserInterface } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  registerUrl = "Account/register"
  loginUrl = "Account/login"

  currentUserSignal = signal<UserInterface | undefined | null>(undefined);

  constructor(private http: HttpClient, private router: Router) {

  }

  public getAuthToken(): string | null{
    return localStorage.getItem('authToken');
  }

  getRoles(): string[] {
    const token = localStorage.getItem('authToken');
    if(token){
      const decoded: any = jwtDecode(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return [];
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if(token){
      return true;
    }
    return false;
  }

  getUserName(): string {
    const token = localStorage.getItem('authToken');
    if(token){
      const decoded: any = jwtDecode(token);
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    return '';
  }


  public register(user: Register){
    return this.http.post(`${environment.apiUrl}${this.registerUrl}`, user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    ).subscribe((response: any) => {
      const token = response.token;
      const displayName = response.displayName;
      const email = response.userName;
      const decoded: any = jwtDecode(token);
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if(token){
        let currUser: UserInterface = {
          email: email,
          token: token,
          username: displayName,
          role: role
        }
        this.currentUserSignal.set(currUser);
        console.log(this.currentUserSignal())
        localStorage.setItem('authToken', token);
        this.router.navigate(['/home']);
      }
    });
  }

  public login(user: Login){
    return this.http.post(`${environment.apiUrl}${this.loginUrl}`, user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    ).subscribe((response: any) => {
      const token = response.token;
      const displayName = response.displayName;
      const email = response.userName;
      const decoded: any = jwtDecode(token);
      const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if(token){
        let currUser: UserInterface = {
          email: email,
          token: token,
          username: displayName,
          role: role
        }
        this.currentUserSignal.set(currUser);
        console.log(this.currentUserSignal())
        localStorage.setItem('authToken', token);
        this.router.navigate(['/home']);
      }
    });
  }
}
