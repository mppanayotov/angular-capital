import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableRecordsComponent } from './table-records/table-records.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    imports: [CommonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule, MatSortModule],
    declarations: [TableRecordsComponent],
    exports: [TableRecordsComponent],
})
export class RecordListTableRecordsModule {}
