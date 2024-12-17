import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from './models/register';
import { Login } from './models/login';
import { Observable, map, catchError, of, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserInterface } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  registerUrl = "Account/register"
  loginUrl = "Account/login"
  confirmUrl = "Account/confirm"
  responseMsg = '';

  currentUserSignal = signal<UserInterface | undefined | null>(undefined);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public confirmEmail(token: string) {
    return this.http
      .get(`${environment.apiUrl}Account/confirm/${token}`)
      .subscribe((response: any) => {
        return response;
      });
  }

  getRoles(): string[] {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    }
    return [];
  }

  confirm(guid: string) {
    this.resetResponseMsg();
    return this.http.get(`${environment.apiUrl}${this.confirmUrl}/${guid}`).pipe(
      catchError((error) => {
        this.responseMsg = error.error.message;
        return throwError(error);
      })
    ).subscribe((response: any) => {
      
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    }
    return false;
  }

  getUserName(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    }
    return '';
  }


  public register(user: Register){
    this.resetResponseMsg();
    return this.http.post(`${environment.apiUrl}${this.registerUrl}`, user).pipe(
      catchError((error) => {
        this.responseMsg = error.error.message;
        return throwError(error);
      })
    ).subscribe((response: any) => {
        if(response.message === 'User created')
        {
          this.router.navigate(['/post-registration']);
        }
    });
  };
  

  public login(user: Login){
    this.resetResponseMsg();
    return this.http.post(`${environment.apiUrl}${this.loginUrl}`, user).pipe(
      catchError((error) => {
        this.responseMsg = error.error.message;
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
      }});
  }

  public resetResponseMsg(){
    this.responseMsg = '';
  }
}
