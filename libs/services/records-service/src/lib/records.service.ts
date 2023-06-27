import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  RecordsEntity,
  addRecord,
  newRecordTemplate,
  removeRecord,
  updateRecord,
  loadRecordsSuccess,
  selectAllRecords,
  RecordsEntityWithoutId,
} from '@capital/shared/records';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  // API base url
  private recordsUrl =
    'https://my-json-server.typicode.com/mppanayotov/Immedis_front_end_internship_2022_hcm_milen_panayotov/records'; // URL to web api

  // Base http headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Array from all the current records entries
  storeRecords: RecordsEntity[] = [];

  constructor(private http: HttpClient, private store: Store) {}

  // GET records from the server
  getRecordsFromServer(): Observable<Array<RecordsEntity>> {
    return this.http.get<RecordsEntity[]>(this.recordsUrl).pipe(
      tap(() => console.log('Fetched records from server')),
      catchError((err) => {
        throw 'Error in fethching records. Details: ' + err;
      })
    );
  }

  // POST: add a new record to the server
  postRecordToServer(record: RecordsEntity): Observable<RecordsEntity> {
    return this.http
      .post<RecordsEntity>(this.recordsUrl, record, this.httpOptions)
      .pipe(
        tap((newRecord: RecordsEntity) =>
          console.log(`Added record id=${newRecord.id}`)
        ),
        catchError((err) => {
          throw `Error in adding new record id=${record.id}. Details: ` + err;
        })
      );
  }

  // PUT: update the record on the server
  putRecordOnServer(record: RecordsEntity): Observable<RecordsEntity> {
    const url = `${this.recordsUrl}/${record.id}`;

    return this.http.put<RecordsEntity>(url, record, this.httpOptions).pipe(
      tap(() => console.log(`Updated record id=${record.id}`)),
      catchError((err) => {
        throw `Error in updating record id=${record.id}. Details: ` + err;
      })
    );
  }

  // DELETE: delete the record from the server
  deleteRecordFromServer(id: number): Observable<RecordsEntity> {
    const url = `${this.recordsUrl}/${id}`;

    return this.http.delete<RecordsEntity>(url, this.httpOptions).pipe(
      tap(() => console.log(`Deleted record id=${id}`)),
      catchError((err) => {
        throw `Error in deleting record id=${id}. Details: ` + err;
      })
    );
  }

  // Announce sucess to store
  loadStoreRecordsSuccess(records: RecordsEntity[]): void {
    this.store.dispatch(loadRecordsSuccess({ records }));
  }

  // Get records from server and annouce to store
  loadRecords(): void {
    this.getRecordsFromServer().subscribe((records) => {
      this.loadStoreRecordsSuccess(records);
      this.storeRecords = records;
    });
  }

  // Select all records from store
  selectAllRecords(): Observable<RecordsEntity[]> {
    this.store.select(selectAllRecords).subscribe((records) => {
      this.storeRecords = records;
    });

    return this.store.select(selectAllRecords);
  }

  // Post record to server and add to store
  addRecord(newRecordData: RecordsEntityWithoutId): void {
    const newRecord = new newRecordTemplate(this.genId(), newRecordData);
    this.postRecordToServer(newRecord).subscribe(() =>
      this.store.dispatch(addRecord({ record: newRecord }))
    );
  }

  // Put record on server and update on store
  updateRecord(editedRecord: RecordsEntity): void {
    this.putRecordOnServer(editedRecord).subscribe(() =>
      this.store.dispatch(updateRecord({ record: editedRecord }))
    );
  }

  // Delete record from server and remove from store
  deleteRecord(recordId: number): void {
    this.deleteRecordFromServer(recordId).subscribe(() =>
      this.store.dispatch(removeRecord({ recordId }))
    );
  }

  // Generate new ID depending on the currentyl existing entries
  genId(): number {
    return this.storeRecords.length > 0
      ? Math.max(...this.storeRecords.map((record) => record.id)) + 1
      : 1;
  }
}
