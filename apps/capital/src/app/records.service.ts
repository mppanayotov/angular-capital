import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecordsEntity } from '@capital/shared/records';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private http: HttpClient) {}

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
}
