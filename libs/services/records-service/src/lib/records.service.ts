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
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private recordsUrl =
    'https://my-json-server.typicode.com/mppanayotov/Immedis_front_end_internship_2022_hcm_milen_panayotov/records'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  storeRecords: RecordsEntity[] = [];

  constructor(private http: HttpClient, private store: Store) {}

  /** GET records from the server */
  getRecordsFromServer(): Observable<Array<RecordsEntity>> {
    return this.http.get<RecordsEntity[]>(this.recordsUrl).pipe(
      tap(() => console.log('Fetched records from server')),
      catchError(this.handleError<RecordsEntity[]>('getRecordsFromServer', []))
    );
  }

  /** POST: add a new record to the server */
  postRecordToServer(record: RecordsEntity): Observable<RecordsEntity> {
    return this.http
      .post<RecordsEntity>(this.recordsUrl, record, this.httpOptions)
      .pipe(
        tap((newRecod: RecordsEntity) =>
          console.log(`Added record w/ id=${newRecod.id}`)
        ),
        catchError(this.handleError<RecordsEntity>('postRecordToServer'))
      );
  }

  /** PUT: update the record on the server */
  putRecordOnServer(record: RecordsEntity): Observable<RecordsEntity> {
    return this.http
      .put<RecordsEntity>(this.recordsUrl, record, this.httpOptions)
      .pipe(
        tap(() => console.log(`Updated record id=${record.id}`)),
        catchError(this.handleError<RecordsEntity>('putRecordOnServer'))
      );
  }

  /** DELETE: delete the record from the server */
  deleteRecordFromServer(id: number): Observable<RecordsEntity> {
    const url = `${this.recordsUrl}/${id}`;

    return this.http.delete<RecordsEntity>(url, this.httpOptions).pipe(
      tap(() => console.log(`Deleted record id=${id}`)),
      catchError(this.handleError<RecordsEntity>('deleteRecordFromServer'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(
    operation = 'operation',
    result?: T
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): (error: any) => Observable<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  loadStoreRecordsSuccess(records: RecordsEntity[]): void {
    this.store.dispatch(loadRecordsSuccess({ records }));
  }

  loadRecords(): void {
    this.getRecordsFromServer().subscribe((records) => {
      this.loadStoreRecordsSuccess(records);
      this.storeRecords = records;
    });
  }

  selectAllRecords(): Observable<RecordsEntity[]> {
    this.store.select(selectAllRecords).subscribe((records) => {
      this.storeRecords = records;
    });

    return this.store.select(selectAllRecords);
  }

  addRecord(newRecordData: RecordsEntityWithoutId): void {
    const newRecord = new newRecordTemplate(this.genId(), newRecordData);
    this.store.dispatch(addRecord({ record: newRecord }));
    this.putRecordOnServer(newRecord);
  }

  updateRecord(editedRecord: RecordsEntity): void {
    this.store.dispatch(updateRecord({ record: editedRecord }));
    this.putRecordOnServer(editedRecord);
  }

  deleteRecord(recordId: number): void {
    this.store.dispatch(removeRecord({ recordId }));
    this.deleteRecordFromServer(recordId);
  }

  genId(): number {
    return this.storeRecords.length > 0
      ? Math.max(...this.storeRecords.map((record) => record.id)) + 1
      : 1;
  }
}
