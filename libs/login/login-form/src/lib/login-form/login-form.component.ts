import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@capital/services/auth-service';

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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  getErrorMessage(field: FormControl): string {
    if (field.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  onSubmit(): void {
    if (this.form.value.username && this.form.value.password) {
      this.authService.login(
        this.form.value.username,
        this.form.value.password
      );
    }
  }
}
