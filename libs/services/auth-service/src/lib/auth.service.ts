import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // Auth API base url
    private apiUrl = '/api-auth';

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
        const exp = localStorage.getItem('exp');
        const currentTime = Date.now();
        const notExpired = currentTime < Number(exp);

        return !!(token && role && notExpired);
    }

    // Return user's role
    role(): string {
        const role = localStorage.getItem('role');

        return role ? role : '';
    }

    // Send authentication to API and test authorization for specified url.
    isAuthorized(navigationUrl: string): Observable<{ token: string; role: string }> {
        const url = `${this.apiUrl}${navigationUrl}`;

        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage['token'] ? localStorage['token'] : '');

        return this.http.get<{ token: string; role: string }>(url, this.httpOptions).pipe(
            tap(() => console.log('Authorized view records')),
            catchError((err) => {
                throw 'Error in viewing records. Details: ' + err;
            })
        );
    }

    // Send login credentials to API.
    login(username: string, password: string): Observable<{ token: string; role: string; exp: string }> {
        const url = `${this.apiUrl}/login`;

        return this.http.post<{
            username: string;
            password: string;
            token: string;
            role: string;
            exp: string;
        }>(url, {
            username,
            password,
        });
    }

    // Remove saved token and role. Redirect to login page.
    logout(): void {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const exp = localStorage.getItem('exp');

        token && localStorage.removeItem('token');
        role && localStorage.removeItem('role');
        exp && localStorage.removeItem('exp');
        this.router.navigate(['/login']);
    }

    // On a successful login: save token and role.
    setSession(apiResponse: { token: string; role: string; exp: string }): void {
        localStorage.setItem('token', apiResponse.token);
        localStorage.setItem('role', apiResponse.role);
        localStorage.setItem('exp', apiResponse.exp);
    }

    // Return the time left until the session expires
    expirationTimer(): Observable<string> {
        const exp = localStorage.getItem('exp');

        return interval(1000).pipe(
            map(() => {
                const result = new Date(Number(exp) - Date.now());

                if (result.getMilliseconds() > 0) {
                    return formatDate(result, 'mm:ss', 'en-US');
                } else {
                    this.logout();
                    return 'Expired';
                }
            })
        );
    }
}
