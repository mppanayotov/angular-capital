import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPhoneComponent } from './input-phone.component';

describe('InputPhoneComponent', () => {
  let component: InputPhoneComponent;
  let fixture: ComponentFixture<InputPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPhoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
