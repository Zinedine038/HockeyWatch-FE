import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailService } from '../email.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.css'
})
export class MailComponent {

  constructor(private email: EmailService){}

  formData = {
    name: '',
    surname: '',
    email: '',
    telephone: 0
  };

  onSubmit() {
    console.log(this.formData);
    console.log("EH")
    this.email.sendEmail(this.formData);
    // Process your form data here
  }
}
