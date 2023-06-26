import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'capital-dialog-add-record',
  templateUrl: './dialog-add-record.component.html',
  styleUrls: ['./dialog-add-record.component.scss'],
})
export class DialogAddRecordComponent {
  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    department: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^\\+\\d{3} \\(\\d{3}\\) \\d{3}-\\d{4}$'),
      ],
    ],
    address: ['', Validators.required],
    salary: [
      '',
      [
        Validators.required,
        Validators.pattern('^[$€]?\\d+(\\,\\d{3})*(\\.\\d{1,2})?$'),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddRecordComponent>
  ) {}

  getErrorMessage(field: FormControl, fieldName: string) {
    if (field.hasError('required')) {
      return 'You must enter a value';
    }

    if (field.hasError('email') || field.hasError('pattern')) {
      return `Not a valid ${fieldName}`;
    }

    return '';
  }
}
