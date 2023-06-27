import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // API base url
  private apiUrl = '/api';

  // Base http headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private router: Router, private http: HttpClient) {}

  // Enable activation of selected component if user has authenticated. Else redirect to login page.
  canActivate(): boolean {
    if (this.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  // Check if user is authenticated (has token + role)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    return !!(token && role);
  }

  // Return user's role
  role(): string {
    const role = localStorage.getItem('role');

    return role ? role : '';
  }

  // Send authentication to API and test authorization for specified url.
  isAuthorized(
    navigarionUrl: string
  ): Observable<{ token: string; role: string }> {
    const url = `${this.apiUrl}${navigarionUrl}`;

    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      localStorage['token'] ? localStorage['token'] : ''
    );

    return this.http
      .get<{ token: string; role: string }>(url, this.httpOptions)
      .pipe(
        tap(() => console.log('Authorized view records')),
        catchError((err) => {
          throw 'Error in viewing records. Details: ' + err;
        })
      );
  }

  // Send login credentials to API. On success save token and role, redirect to record list page
  login(username: string, password: string): void {
    const url = `${this.apiUrl}/login`;

    this.http
      .post<{
        username: string;
        password: string;
        token: string;
        role: string;
      }>(url, {
        username,
        password,
      })
      .pipe(
        tap(() => console.log('Logged in to server')),
        catchError((err) => {
          throw 'Error in logging in. Details: ' + err;
        })
      )
      .subscribe((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/record-list']);
      });
  }

  // Remove saved token and role. Redirect to login page.
  logout(): void {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    token && localStorage.removeItem('token');
    role && localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
