import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RECORDS_FEATURE_KEY, RecordsState, recordsAdapter } from './records.reducer';

// Lookup the 'Records' feature state managed by NgRx
export const selectRecordsState = createFeatureSelector<RecordsState>(RECORDS_FEATURE_KEY);

const { selectAll, selectEntities } = recordsAdapter.getSelectors();

export const selectRecordsLoaded = createSelector(selectRecordsState, (state: RecordsState) => state.loaded);

export const selectRecordsError = createSelector(selectRecordsState, (state: RecordsState) => state.error);

export const selectAllRecords = createSelector(selectRecordsState, (state: RecordsState) => selectAll(state));

export const selectRecordsEntities = createSelector(selectRecordsState, (state: RecordsState) => selectEntities(state));

export const selectSelectedId = createSelector(selectRecordsState, (state: RecordsState) => state.selectedId);

export const selectEntity = createSelector(selectRecordsEntities, selectSelectedId, (entities, selectedId) => (selectedId ? entities[selectedId] : undefined));
