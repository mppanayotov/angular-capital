import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDeleteRecordComponent } from './dialog-delete-record/dialog-delete-record.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [DialogDeleteRecordComponent],
  exports: [DialogDeleteRecordComponent],
})
export class RecordListDialogDeleteRecordModule {}
