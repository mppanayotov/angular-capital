import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as RecordsActions from './records.actions';
import { RecordsEffects } from './records.effects';

describe('RecordsEffects', () => {
    let actions: Observable<Action>;
    let effects: RecordsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [RecordsEffects, provideMockActions(() => actions), provideMockStore()],
        });

        effects = TestBed.inject(RecordsEffects);
    });

    describe('init$', () => {
        it('should work', () => {
            actions = hot('-a-|', { a: RecordsActions.initRecords() });

            const expected = hot('-a-|', {
                a: RecordsActions.loadRecordsSuccess({ records: [] }),
            });

            expect(effects.init$).toBeObservable(expected);
        });
    });
});
