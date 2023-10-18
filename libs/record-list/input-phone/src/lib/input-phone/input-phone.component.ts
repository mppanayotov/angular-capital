import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'capital-input-phone',
  templateUrl: './input-phone.component.html',
  styleUrls: ['./input-phone.component.scss'],
})
export class InputPhoneComponent {
  form = this.formBuilder.group({
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^\\+\\d{3} \\(\\d{3}\\) \\d{3}-\\d{4}$'),
      ],
    ],
  });

  constructor(private formBuilder: FormBuilder) {}

  getErrorMessage(field: FormControl, fieldName: string): string {
    if (field.hasError('required')) {
      return 'You must enter a value';
    }

    if (field.hasError('email') || field.hasError('pattern')) {
      return `Not a valid ${fieldName}`;
    }

    return '';
  }
}
