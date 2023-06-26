import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  private apiUrl = '/api/login';

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // User is authenticated, allow access to the route
      return true;
    }

    // User is not authenticated, redirect to the login page
    this.router.navigate(['/login']);
    return false;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }
    return false;
  }

  login(username: string, password: string): void {
    this.http
      .post<any>(this.apiUrl, {
        username,
        password,
      })
      .subscribe((response) => {
        // Store the received token in local storage
        localStorage.setItem('token', response.token);
        this.router.navigate(['/record-list']);
      });
  }

  logout(): void {
    const token = localStorage.getItem('token');

    if (token) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
