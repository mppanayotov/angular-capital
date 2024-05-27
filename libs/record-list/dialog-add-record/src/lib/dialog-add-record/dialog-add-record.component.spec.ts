import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddRecordComponent } from './dialog-add-record.component';

describe('DialogAddRecordComponent', () => {
  let component: DialogAddRecordComponent;
  let fixture: ComponentFixture<DialogAddRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddRecordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
