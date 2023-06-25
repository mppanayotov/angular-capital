import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RecordsActions from './records.actions';
import { RecordsEntity } from './records.models';

export const RECORDS_FEATURE_KEY = 'records';

export interface RecordsState extends EntityState<RecordsEntity> {
  selectedId?: string | number; // which Records record has been selected
  loaded: boolean; // has the Records list been loaded
  error?: string | null; // last known error (if any)
}

export interface RecordsPartialState {
  readonly [RECORDS_FEATURE_KEY]: RecordsState;
}

export const recordsAdapter: EntityAdapter<RecordsEntity> =
  createEntityAdapter<RecordsEntity>();

export const initialRecordsState: RecordsState = recordsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const reducer = createReducer(
  initialRecordsState,
  on(RecordsActions.initRecords, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(RecordsActions.loadRecordsSuccess, (state, { records }) =>
    recordsAdapter.setAll(records, { ...state, loaded: true })
  ),
  on(RecordsActions.loadRecordsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(RecordsActions.addRecord, (state, { record }) => {
    return recordsAdapter.addOne(record, state);
  }),
  on(RecordsActions.updateRecord, (state, { record }) => {
    return recordsAdapter.setOne(record, state);
  }),
  on(RecordsActions.removeRecord, (state, { recordId }) => {
    return recordsAdapter.removeOne(recordId, state);
  })
);

export function recordsReducer(
  state: RecordsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
