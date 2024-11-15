import { Injectable, signal } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Register} from "./models/register";
import { Login } from "./models/login";
import { Observable, map, catchError, of } from "rxjs";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { UserInterface } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  registerUrl = "register"
  loginUrl = "Account/login"
  isCasterUrl = "Account/is"
  current = "Account/current"

  currentUserSignal = signal<UserInterface | undefined | null>(undefined);

  constructor(private http: HttpClient, private router: Router) {

  }

  public getCurrentUser(){
    return this.http.get(`${environment.apiUrl}${this.current}`).subscribe((response: any) => {
      console.log(response)
    });
  }

  public getAuthToken(): string | null{
    return localStorage.getItem('authToken');
  }

  public register(user: Register){
    return this.http.post(`${environment.apiUrl}${this.registerUrl}`, user).subscribe();
  }

  public isRole(role: string): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}${this.isCasterUrl}${role}`).pipe(
      map(() => true),          // If the response is successful (200), return true
      catchError(() => of(false)) // If there's any error, return false
    );
  }

  public isCaster(): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}${this.isCasterUrl}`).pipe(
      map(() => true),          // If the response is successful (200), return true
      catchError(() => of(false)) // If there's any error, return false
    );
  }

  getRoles(): string[] {
    const token = localStorage.getItem('authToken');
    if(token){
      const decoded: any = jwtDecode(token);
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return [];
  }

  public login(user: Login){
    return this.http.post(`${environment.apiUrl}${this.loginUrl}`, user).subscribe((response: any) => {
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
