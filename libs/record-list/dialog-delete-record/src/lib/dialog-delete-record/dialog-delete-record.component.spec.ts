import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteRecordComponent } from './dialog-delete-record.component';

describe('DialogDeleteRecordComponent', () => {
    let component: DialogDeleteRecordComponent;
    let fixture: ComponentFixture<DialogDeleteRecordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogDeleteRecordComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DialogDeleteRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
