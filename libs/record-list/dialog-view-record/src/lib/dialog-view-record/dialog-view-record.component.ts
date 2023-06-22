import { Component, Inject } from '@angular/core';
import { RecordsEntity } from '@capital/shared/records';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'capital-dialog-view-record',
  templateUrl: './dialog-view-record.component.html',
  styleUrls: ['./dialog-view-record.component.scss'],
})
export class DialogViewRecordComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogViewRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecordsEntity
  ) {}
}
