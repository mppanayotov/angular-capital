import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogViewRecordComponent } from './dialog-view-record/dialog-view-record.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  declarations: [DialogViewRecordComponent],
  exports: [DialogViewRecordComponent],
})
export class RecordListDialogViewRecordModule {}
