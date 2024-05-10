import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class EmailService {

  private emailUrl =  'http://localhost:5000/api/send-email'

  constructor(private http: HttpClient) {}

  sendEmail(form: any){
    const data = {
      name: form.name,
      surname: form.surname,
      email: form.email,
      telephone: form.telephone
    };

    console.log("oeeeeeeeeeeeeeeeeeleh");
    return this.http.post(this.emailUrl, data);
  }
}
