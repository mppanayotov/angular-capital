import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, Input, Optional } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'capital-input-phone',
  templateUrl: './input-phone.component.html',
  styleUrls: ['./input-phone.component.scss'],
})
export class InputPhoneComponent
  implements ControlValueAccessor, MatFormFieldControl<teltest>
{
  focused = false;
  touched = false;
  stateChanges = new Subject<void>();
  onChange = (_: any) => {};
  onTouched = () => {};
  form = this.formBuilder.group({
    part1: ['', [Validators.required]],
    part2: ['', [Validators.required]],
    part3: ['', [Validators.required]],
  });

  @Input()
  get value(): teltest | null {
    if (this.form.valid) {
      const {
        value: { part1, part2, part3 },
      } = this.form;
      return new teltest(part1!, part2!, part3!);
    }
    return null;
  }
  set value(tel: teltest | null) {
    const { part1, part2, part3 } = tel;
    this.form.setValue({ part1, part2, part3 });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.form.invalid && this.touched;
  }

  constructor(
    private formBuilder: FormBuilder,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public formField: MatFormField
  ) {}

  writeValue(tel: teltest | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getErrorMessage(field: FormControl, fieldName: string): string {
    if (field.hasError('required')) {
      return 'You must enter a value';
    }

    if (field.hasError('email') || field.hasError('pattern')) {
      return `Not a valid ${fieldName}`;
    }

    return '';
  }

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && nextElement) {
      this.focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this.focusMonitor.focusVia(prevElement, 'program');
    }
  }

  handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this.elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }
}

export interface teltest {
  part1: string | null;
  part2: string | null;
  part3: string | null;
}
