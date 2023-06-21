import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as RecordsActions from './records.actions';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RecordsFeature from './records.reducer';

@Injectable()
export class RecordsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecordsActions.initRecords),
      switchMap(() => of(RecordsActions.loadRecordsSuccess({ records: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(RecordsActions.loadRecordsFailure({ error }));
      })
    )
  );
}
