import { Component, OnInit } from '@angular/core';
import {
  RecordsEntity,
  selectAllRecords,
  addRecord,
  removeRecord,
  updateRecord,
  newRecordTemplate,
} from '@capital/shared/records';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddRecordComponent } from '@capital/record-list/dialog-add-record';
import { DialogDeleteRecordComponent } from '@capital/record-list/dialog-delete-record';
import { DialogEditRecordComponent } from '@capital/record-list/dialog-edit-record';
import { DialogViewRecordComponent } from '@capital/record-list/dialog-view-record';

@Component({
  selector: 'capital-record-list-page',
  templateUrl: './record-list-page.component.html',
  styleUrls: ['./record-list-page.component.scss'],
})
export class RecordListPageComponent implements OnInit {
  records$ = this.store.select(selectAllRecords);
  records: RecordsEntity[] = [];
  dataSource: MatTableDataSource<RecordsEntity> = new MatTableDataSource();

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.records$.subscribe((records) => {
      this.records = records;
    });
  }

  handleOpenViewDialog(row: RecordsEntity): void {
    this.dialog.open(DialogViewRecordComponent, {
      data: row,
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DialogAddRecordComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.onAdd(result);
    });
  }

  handleOpenEditDialog(row: RecordsEntity): void {
    const dialogRef = this.dialog.open(DialogEditRecordComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const editedRecord: RecordsEntity = {
          ...result,
          id: row.id,
        };
        this.onEdit(editedRecord);
      }
    });
  }

  handleOpenDeleteDialog(row: RecordsEntity): void {
    const dialogRef = this.dialog.open(DialogDeleteRecordComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.onDelete(result?.id);
    });
  }

  onAdd(addDialogResult: RecordsEntity) {
    const newRecord = new newRecordTemplate(this.genId(), addDialogResult);
    this.store.dispatch(addRecord({ record: newRecord }));
  }

  onEdit(editedRecord: RecordsEntity) {
    this.store.dispatch(updateRecord({ record: editedRecord }));
  }

  onDelete(recordId: string) {
    this.store.dispatch(removeRecord({ recordId }));
  }

  genId(): number {
    return this.records.length > 0
      ? Math.max(...this.records.map((record) => record.id)) + 1
      : 1;
  }
}
