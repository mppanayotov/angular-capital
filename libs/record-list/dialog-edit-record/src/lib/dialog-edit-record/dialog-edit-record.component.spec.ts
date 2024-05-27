import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditRecordComponent } from './dialog-edit-record.component';

describe('DialogEditRecordComponent', () => {
    let component: DialogEditRecordComponent;
    let fixture: ComponentFixture<DialogEditRecordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DialogEditRecordComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DialogEditRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
