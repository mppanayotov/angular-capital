import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/record-list', pathMatch: 'full' },
  {
    path: 'record-list',
    loadChildren: () =>
      import('@capital/record-list/record-list-page').then(
        (module) => module.RecordListRecordListPageModule
      ),
  },
];
