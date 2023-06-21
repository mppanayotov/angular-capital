import { Action } from '@ngrx/store';

import * as RecordsActions from './records.actions';
import { RecordsEntity } from './records.models';
import {
  RecordsState,
  initialRecordsState,
  recordsReducer,
} from './records.reducer';

describe('Records Reducer', () => {
  const createRecordsEntity = (
    id: number,
    name = '',
    department = '',
    email = '',
    phone = '',
    address = '',
    salaray = ''
  ): RecordsEntity => ({
    id,
    name: name || `name-${id}`,
    department: department || `department-${id}`,
    email: email || `email-${id}`,
    phone: phone || `phone-${id}`,
    address: address || `address-${id}`,
    salaray: salaray || `salaray-${id}`,
  });

  describe('valid Records actions', () => {
    it('loadRecordsSuccess should return the list of known Records', () => {
      const records = [createRecordsEntity(111), createRecordsEntity(222)];
      const action = RecordsActions.loadRecordsSuccess({ records });

      const result: RecordsState = recordsReducer(initialRecordsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = recordsReducer(initialRecordsState, action);

      expect(result).toBe(initialRecordsState);
    });
  });
});
