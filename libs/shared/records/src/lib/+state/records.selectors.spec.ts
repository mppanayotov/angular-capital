import { RecordsEntity } from './records.models';
import {
  recordsAdapter,
  RecordsPartialState,
  initialRecordsState,
} from './records.reducer';
import * as RecordsSelectors from './records.selectors';

describe('Records Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getRecordsId = (it: RecordsEntity) => it.id;
  const createRecordsEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as RecordsEntity);

  let state: RecordsPartialState;

  beforeEach(() => {
    state = {
      records: recordsAdapter.setAll(
        [
          createRecordsEntity(111),
          createRecordsEntity(222),
          createRecordsEntity(333),
        ],
        {
          ...initialRecordsState,
          selectedId: 222,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Records Selectors', () => {
    it('selectAllRecords() should return the list of Records', () => {
      const results = RecordsSelectors.selectAllRecords(state);
      const selId = getRecordsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(222);
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = RecordsSelectors.selectEntity(state) as RecordsEntity;
      const selId = getRecordsId(result);

      expect(selId).toBe(222);
    });

    it('selectRecordsLoaded() should return the current "loaded" status', () => {
      const result = RecordsSelectors.selectRecordsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectRecordsError() should return the current "error" state', () => {
      const result = RecordsSelectors.selectRecordsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
