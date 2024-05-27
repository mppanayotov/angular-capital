import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogViewRecordComponent } from './dialog-view-record.component';

describe('DialogViewRecordComponent', () => {
    let component: DialogViewRecordComponent;
    let fixture: ComponentFixture<DialogViewRecordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogViewRecordComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DialogViewRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
