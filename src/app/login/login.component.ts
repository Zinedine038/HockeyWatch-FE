import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models/login';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoginComponent implements OnInit {
  title = 'Login';

  router = inject(Router);
  formBuilder = inject(FormBuilder);
  authenticationService = inject(AuthenticationService);

  loginDto = new Login();
  formSubmitted = false;

  loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
    this.authenticationService.resetResponseMsg();
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.login();
  }

  login() {
    const emailControl = this.loginFormGroup.get('email');
    const passwordControl = this.loginFormGroup.get('password');
    if (emailControl) {
      this.loginDto.email = emailControl.value || '';
    }
    if (passwordControl) {
      this.loginDto.password = passwordControl.value || '';
    }

    const response = this.authenticationService.login(this.loginDto);
    console.log(response);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  getErrorMessage(controlName: string) {
    const control = this.loginFormGroup.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase()}${controlName.slice(
        1,
      )} is required`;
    }

    if (controlName === 'email' && control?.hasError('email')) {
      return 'You must enter a valid email address';
    }

    return '';
  }
}
