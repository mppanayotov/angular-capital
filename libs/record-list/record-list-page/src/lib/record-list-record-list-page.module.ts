import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { recordListRecordListPageRoutes } from './lib.routes';
import { RecordListPageComponent } from './record-list-page/record-list-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(recordListRecordListPageRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [RecordListPageComponent],
  exports: [RecordListPageComponent],
})
export class RecordListRecordListPageModule {}
