import { createAction, props } from '@ngrx/store';
import { RecordsEntity } from './records.models';

export const initRecords = createAction('[Records] Init');

export const loadRecordsSuccess = createAction('[Records/API] Load Records Success', props<{ records: RecordsEntity[] }>());

export const loadRecordsFailure = createAction(
    '[Records/API] Load Records Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
);

export const removeRecord = createAction('[Records] Remove Record', props<{ recordId: number }>());

export const addRecord = createAction('[Records] Add Record', props<{ record: RecordsEntity }>());

export const updateRecord = createAction('[Records] Update Record', props<{ record: RecordsEntity }>());
