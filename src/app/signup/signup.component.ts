import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequest } from '../models';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup;
  passwordMismatch: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  signup():void {
    if (this.signupForm.get('password')?.value !== this.signupForm.get('confirmPassword')?.value) {
      this.passwordMismatch = true;
    } else {
    console.log(this.signupForm.value as SignupRequest);
    const signupRequest: SignupRequest = {
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,};
    this.authService.signup(signupRequest).subscribe(
      () => { 
        this.router.navigate(['/dashboard']);},
    (error) => {
      alert(error.Mensaje)
    })
  }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
    }

}
