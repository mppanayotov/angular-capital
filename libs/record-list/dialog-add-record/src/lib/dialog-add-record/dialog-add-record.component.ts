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
    name: ['', Validators.required],
    department: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    salary: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddRecordComponent>
  ) {}

  getErrorMessage(field: FormControl) {
    if (field == this.form.controls.email) {
      if (this.form.controls.email.hasError('required')) {
        return 'You must enter a value';
      }

      return this.form.controls.email.hasError('email') && 'Not a valid email';
    }

    if (field.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
