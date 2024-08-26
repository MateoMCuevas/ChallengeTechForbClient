import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { LoginRequest } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login():void {
    console.log(this.loginForm.value as LoginRequest);
    this.authService.login(this.loginForm.value as LoginRequest).subscribe(
      () => { 
        this.router.navigate(['/dashboard']);},
    (error) => {
      alert("Email or password incorrect")
    })
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
    }
}
