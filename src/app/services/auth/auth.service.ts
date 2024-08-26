import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, SignupRequest, User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);
  authStatus = this.loggedIn.asObservable();
  private currentLoginOn = new BehaviorSubject<boolean>(false);
  private currentUserData = new BehaviorSubject<string>('');


  constructor(private http: HttpClient) {
    this.currentLoginOn.next(localStorage.getItem('token') !== null);
    this.currentUserData.next(localStorage.getItem('token') || '');
    this.loggedIn.next(this.currentLoginOn.value);
  }

  getUser():Observable<any>{
    return this.http.get<any>(this.apiUrl+'/api/user/get')
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl +'/api/auth/login', loginRequest).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.currentUserData.next(response.token);
        this.currentLoginOn.next(true);
        this.loggedIn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/auth/signup', signupRequest).pipe(
      tap((userData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role);
        this.currentUserData.next(userData.token);
        this.currentLoginOn.next(true);
        this.loggedIn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserData.next('');
    this.currentLoginOn.next(false);
    this.loggedIn.next(false);
  }

 
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error:', error.error);
    } else {
      console.error('Backend returned status code:', error.status);
    }
    return throwError(() => new Error('Something went wrong, please try again.'));
  }

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentLoginOn.asObservable();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }

  public isUserLoggedIn(): boolean {
    return !!this.userToken;
  }
}

