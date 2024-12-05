import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Register } from '../models/register';
import { OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ElementService } from '../element.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  title = 'Login/Register';

  formBuilder = inject(FormBuilder);
  authenticationService = inject(AuthenticationService);
  
  registerDto = new Register();
  formSubmitted = false;
  
  registerFormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')]]
  });

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.formSubmitted = true;
    if(this.registerFormGroup.invalid){
      return;
    }
    this.register();
  }

  register() {
    const emailControl = this.registerFormGroup.get("email");
    const passwordControl = this.registerFormGroup.get("password");
    const nameControl = this.registerFormGroup.get("name");
    if (emailControl) {
      this.registerDto.email = emailControl.value || "";
    }
    if(passwordControl){
      this.registerDto.password = passwordControl.value || "";
    }
    if(nameControl){
      this.registerDto.name = nameControl.value || "";
    }
    this.authenticationService.register(this.registerDto);
  }

  getErrorMessage(controlName: string) {
    const control = this.registerFormGroup.get(controlName);
    if(control?.hasError('required')){
      return `${controlName.charAt(0).toUpperCase()}${controlName.slice(1)} is required`;
    }

    if(controlName === 'password' && control?.hasError('pattern')){
      return 'Password must contain at least 8 characters, one number, and one special character';
    }

    if(controlName === 'email' && control?.hasError('email')){
      return 'You must enter a valid email address';
    }

    return '';
  }


}
