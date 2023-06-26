import {
  OnChanges,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { RecordsEntity } from '@capital/shared/records';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'capital-table-records',
  templateUrl: './table-records.component.html',
  styleUrls: ['./table-records.component.scss'],
})
export class TableRecordsComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() filter = '';
  @Input() displayedColumns: string[] = [];
  @Input() records: RecordsEntity[] = [];
  @Input() role = '';

  @Output() openViewDialogEvent = new EventEmitter<RecordsEntity>();
  @Output() openEditDialogEvent = new EventEmitter<RecordsEntity>();
  @Output() openDeleteDialogEvent = new EventEmitter<RecordsEntity>();

  dataSource: MatTableDataSource<RecordsEntity> = new MatTableDataSource();

  ngOnChanges(changes: SimpleChanges): void {
    changes['records'] && this.updateDatasource();
    changes['filter'] && this.applyFilter();
  }

  updateDatasource(): void {
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
  }

  applyFilter(): void {
    this.dataSource.filter = this.filter.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openViewDialog(row: RecordsEntity): void {
    this.openViewDialogEvent.emit(row);
  }

  openEditDialog(row: RecordsEntity): void {
    this.openEditDialogEvent.emit(row);
  }

  openDeleteDialog(row: RecordsEntity): void {
    this.openDeleteDialogEvent.emit(row);
  }
}
