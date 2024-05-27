import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { loginLoginPageRoutes } from './lib.routes';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginLoginFormModule } from '@capital/login/login-form';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(loginLoginPageRoutes), LoginLoginFormModule],
    declarations: [LoginPageComponent],
    exports: [LoginPageComponent],
})
export class LoginLoginPageModule {}
