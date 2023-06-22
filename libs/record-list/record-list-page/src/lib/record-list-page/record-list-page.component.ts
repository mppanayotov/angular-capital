import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
import { DialogAddRecordComponent } from '@capital/record-list/dialog-add-record';
import { DialogDeleteRecordComponent } from '@capital/record-list/dialog-delete-record';
import { DialogEditRecordComponent } from '@capital/record-list/dialog-edit-record';
import { DialogViewRecordComponent } from '@capital/record-list/dialog-view-record';

@Component({
  selector: 'capital-record-list-page',
  templateUrl: './record-list-page.component.html',
  styleUrls: ['./record-list-page.component.scss'],
})
export class RecordListPageComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<RecordsEntity> = new MatTableDataSource();

  records$ = this.store.select(selectAllRecords);
  records: RecordsEntity[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'department', 'salary', 'actions'];

  constructor(private store: Store, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.records$.subscribe((records) => {
      this.records = records;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.sortingDataAccessor = (record, property) => {
        switch (property) {
          case 'name':
            return record.name;
          case 'department':
            return record.department;
          default:
            return -record.salary.replace(/[^0-9.-]+/g, '');
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openViewDialog(row: RecordsEntity): void {
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

  openEditDialog(row: RecordsEntity): void {
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

  openDeleteDialog(row: RecordsEntity): void {
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
