import { Component, OnInit } from '@angular/core';
import { RecordsEntity } from '@capital/shared/records';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddRecordComponent } from '@capital/record-list/dialog-add-record';
import { DialogDeleteRecordComponent } from '@capital/record-list/dialog-delete-record';
import { DialogEditRecordComponent } from '@capital/record-list/dialog-edit-record';
import { DialogViewRecordComponent } from '@capital/record-list/dialog-view-record';
import { RecordsService } from '@capital/services/records-service';

@Component({
  selector: 'capital-record-list-page',
  templateUrl: './record-list-page.component.html',
  styleUrls: ['./record-list-page.component.scss'],
})
export class RecordListPageComponent implements OnInit {
  records$ = this.recordsService.selectAllStoreRecords();
  records: RecordsEntity[] = [];

  constructor(
    private recordsService: RecordsService,
    private dialog: MatDialog
  ) {}

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

  onAdd(addDialogResult: RecordsEntity): void {
    this.recordsService.addStoreRecord(addDialogResult);
  }

  onEdit(editedRecord: RecordsEntity): void {
    this.recordsService.updateStoreRecord(editedRecord);
  }

  onDelete(recordId: string): void {
    this.recordsService.deleteStoreRecord(recordId);
  }
}
