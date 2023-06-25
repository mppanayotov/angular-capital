import { Component, OnInit } from '@angular/core';
import { RecordsService } from '@capital/services/records-service';

@Component({
  selector: 'capital-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'capital';

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.recordsService.loadRecords();
  }
}
