import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@capital/services/auth-service';

@Component({
    selector: 'capital-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.isAuthenticated() && this.router.navigate(['/record-list']);
    }
}
