import { Route } from '@angular/router';
import { AuthService } from '@capital/services/auth-service';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/record-list', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('@capital/login/login-page').then((module) => module.LoginLoginPageModule),
  },
  {
    path: 'record-list',
    loadChildren: () => import('@capital/record-list/record-list-page').then((module) => module.RecordListRecordListPageModule),
    canActivate: [AuthService],
  },
];
