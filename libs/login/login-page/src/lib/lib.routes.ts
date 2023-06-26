import { Route } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

export const loginLoginPageRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: LoginPageComponent },
];
