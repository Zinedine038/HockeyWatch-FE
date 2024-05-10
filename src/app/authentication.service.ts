import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Register} from "./models/register";
import { Login } from "./models/login";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { JwtAuth } from "./models/jwtAuth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  registerUrl = "/AuthManagement/Register"
  loginUrl = "/AuthManagement/Login"

  constructor(private http: HttpClient) {

  }

  public register(user: Register): Observable<JwtAuth>{
    return this.http.post<JwtAuth>(`${environment.apiUrl}${this.registerUrl}`, user)
  }

  public login(user: Login): Observable<JwtAuth>{
    return this.http.post<JwtAuth>(`${environment.apiUrl}${this.loginUrl}`, user)
  }
}
