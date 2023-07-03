import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { recordListRecordListPageRoutes } from './lib.routes';
import { RecordListPageComponent } from './record-list-page/record-list-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecordListTableRecordsModule } from '@capital/record-list/table-records';
import { SharedHeaderModule } from '@capital/shared/header';
import { SharedFooterModule } from '@capital/shared/footer';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recordListRecordListPageRoutes),
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    RecordListTableRecordsModule,
    SharedHeaderModule,
    SharedFooterModule,
  ],
  declarations: [RecordListPageComponent],
  exports: [RecordListPageComponent],
})
export class RecordListRecordListPageModule {}
