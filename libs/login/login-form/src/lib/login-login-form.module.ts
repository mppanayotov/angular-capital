import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginLoginFormModule {}
