import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RecordsEntity,
  addRecord,
  newRecordTemplate,
  removeRecord,
  updateRecord,
  loadRecordsSuccess,
  selectAllRecords,
} from '@capital/shared/records';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private http: HttpClient, private store: Store) {}

  storeRecords: RecordsEntity[] = [];

  getRecords(): Observable<Array<RecordsEntity>> {
    return this.http
      .get<RecordsEntity[]>(
        'https://my-json-server.typicode.com/mppanayotov/Immedis_front_end_internship_2022_hcm_milen_panayotov/records'
      )
      .pipe(
        tap(() => console.log('Fetched records from server')),
        catchError((err) => {
          throw 'Error in fethching records. Details: ' + err;
        })
      );
  }

  loadStoreRecordsSuccess(records: RecordsEntity[]) {
    this.store.dispatch(loadRecordsSuccess({ records }));
  }

  selectAllStoreRecords(): Observable<RecordsEntity[]> {
    this.store.select(selectAllRecords).subscribe((records) => {
      this.storeRecords = records;
    });

    return this.store.select(selectAllRecords);
  }

  addStoreRecord(newRecordData: RecordsEntity) {
    const newRecord = new newRecordTemplate(this.genId(), newRecordData);
    this.store.dispatch(addRecord({ record: newRecord }));
  }

  updateStoreRecord(editRecordData: RecordsEntity) {
    this.store.dispatch(updateRecord({ record: editRecordData }));
  }

  deleteStoreRecord(recordId: string) {
    this.store.dispatch(removeRecord({ recordId }));
  }

  genId(): number {
    return this.storeRecords.length > 0
      ? Math.max(...this.storeRecords.map((record) => record.id)) + 1
      : 1;
  }
}
