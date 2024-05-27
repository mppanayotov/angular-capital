import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { RecordListPageComponent } from './record-list-page.component';

describe('RecordListPageComponent', () => {
    let component: RecordListPageComponent;
    let fixture: ComponentFixture<RecordListPageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [RecordListPageComponent],
            imports: [NoopAnimationsModule, MatPaginatorModule, MatSortModule, MatTableModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecordListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });
});
