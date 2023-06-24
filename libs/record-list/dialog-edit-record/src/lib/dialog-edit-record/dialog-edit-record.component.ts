import { Component, Inject } from '@angular/core';
import { RecordsEntity } from '@capital/shared/records';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'capital-dialog-edit-record',
  templateUrl: './dialog-edit-record.component.html',
  styleUrls: ['./dialog-edit-record.component.scss'],
})
export class DialogEditRecordComponent {
  form = this.formBuilder.group({
    name: [this.data.name, Validators.required],
    department: [this.data.department, Validators.required],
    email: [this.data.email, [Validators.required, Validators.email]],
    phone: [this.data.phone, Validators.required],
    address: [this.data.address, Validators.required],
    salary: [this.data.salary, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecordsEntity
  ) {}

  getErrorMessage(
    field: FormControl
  ): false | 'You must enter a value' | 'Not a valid email' | '' {
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
