import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getLoggedInUser() {
    throw new Error('Method not implemented.');
  }

  private backendUrl = 'http://localhost:8080';

  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/v1/auth/signup`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/v1/auth/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      })
    );
  }

   sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/v1/auth/sendOtp`, { email });
  }

  // ✅ Reset Password
  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/v1/auth/resetPassword`, { email, otp, newPassword });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}