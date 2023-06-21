import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRecordsSuccess } from '@capital/shared/records';
import { RecordsService } from './records.service';

@Component({
  selector: 'capital-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'capital';

  constructor(private recordsService: RecordsService, private store: Store) {}

  ngOnInit() {
    this.recordsService
      .getRecords()
      .subscribe((records) =>
        this.store.dispatch(loadRecordsSuccess({ records }))
      );
  }
}
