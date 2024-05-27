import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRecordsComponent } from './table-records.component';

describe('TableRecordsComponent', () => {
    let component: TableRecordsComponent;
    let fixture: ComponentFixture<TableRecordsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableRecordsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TableRecordsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
