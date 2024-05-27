import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@capital/services/auth-service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
    selector: 'capital-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {}

    getErrorMessage(field: FormControl): string {
        if (field.hasError('required')) {
            return 'You must enter a value';
        }

        if (field.errors?.valueOf() == 401) {
            return 'Wrong username/password';
        }

        return '';
    }

    onSubmit(): void {
        if (this.form.value.username && this.form.value.password) {
            this.authService
                .login(this.form.value.username.trim(), this.form.value.password.trim())
                .pipe(
                    tap(() => console.log('Logged in to server')),
                    catchError((err) => {
                        this.form.controls.password.setErrors(err.status);
                        this.form.controls.username.setErrors(err.status);
                        throw 'Error in logging in. Details: ' + err;
                    })
                )
                .subscribe((response) => {
                    this.authService.setSession(response);
                    this.router.navigate(['/record-list']);
                });
        }
    }
}
