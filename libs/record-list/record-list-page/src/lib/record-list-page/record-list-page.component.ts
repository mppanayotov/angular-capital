import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecordsEntity, selectAllRecords } from '@capital/shared/records';
import { Store } from '@ngrx/store';

@Component({
  selector: 'capital-record-list-page',
  templateUrl: './record-list-page.component.html',
  styleUrls: ['./record-list-page.component.scss'],
})
export class RecordListPageComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<RecordsEntity> = new MatTableDataSource();

  records$ = this.store.select(selectAllRecords);
  records: RecordsEntity[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'department', 'salary', 'actions'];

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    this.records$.subscribe((records) => {
      this.records = records;
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.sortingDataAccessor = (user, property) => {
        switch (property) {
          case 'name':
            return user.name;
          case 'department':
            return user.department;
          default:
            return -user.salary.replace(/[^0-9.-]+/g, '');
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(row: RecordsEntity): void {
    console.log('open edit', row);
  }

  openDeleteDialog(row: RecordsEntity): void {
    console.log('open delete', row);
  }
}
