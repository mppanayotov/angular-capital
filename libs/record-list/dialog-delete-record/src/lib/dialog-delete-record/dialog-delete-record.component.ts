import { Component, Inject } from '@angular/core';
import { RecordsEntity } from '@capital/shared/records';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'capital-dialog-delete-record',
    templateUrl: './dialog-delete-record.component.html',
    styleUrls: ['./dialog-delete-record.component.scss'],
})
export class DialogDeleteRecordComponent {
    constructor(public dialogRef: MatDialogRef<DialogDeleteRecordComponent>, @Inject(MAT_DIALOG_DATA) public data: RecordsEntity) {}
}
