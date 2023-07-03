import { Component, OnInit } from '@angular/core';
import { RecordsEntity, RecordsEntityWithoutId } from '@capital/shared/records';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAddRecordComponent } from '@capital/record-list/dialog-add-record';
import { DialogDeleteRecordComponent } from '@capital/record-list/dialog-delete-record';
import { DialogEditRecordComponent } from '@capital/record-list/dialog-edit-record';
import { DialogViewRecordComponent } from '@capital/record-list/dialog-view-record';
import { RecordsService } from '@capital/services/records-service';
import { AuthService } from '@capital/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'capital-record-list-page',
  templateUrl: './record-list-page.component.html',
  styleUrls: ['./record-list-page.component.scss'],
})
export class RecordListPageComponent implements OnInit {
  records$ = this.recordsService.selectAllRecords();
  records: RecordsEntity[] = [];
  role = this.authService.role();
  authorized$ = this.authService.isAuthorized(this.router.url);

  constructor(
    private router: Router,
    private recordsService: RecordsService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authorized$.subscribe(() => {
      this.recordsService.loadRecords();
      this.records$.subscribe((records) => {
        this.records = records;
      });
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

  onAdd(addDialogResult: RecordsEntityWithoutId): void {
    this.recordsService.addRecord(addDialogResult);
    this.snackBar.open(`Added new record`, undefined, {
      duration: 2000,
    });
  }

  onEdit(editedRecord: RecordsEntity): void {
    this.recordsService.updateRecord(editedRecord);
    this.snackBar.open(`Record updated`, undefined, {
      duration: 2000,
    });
  }

  onDelete(recordId: number): void {
    this.recordsService.deleteRecord(recordId);
    this.snackBar.open(`Record deleted`, undefined, {
      duration: 2000,
    });
  }
}
