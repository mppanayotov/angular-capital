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
    name: [this.data.name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    department: [this.data.department, Validators.required],
    email: [this.data.email, [Validators.required, Validators.email]],
    phone: [this.data.phone, [Validators.required, Validators.pattern('^\\+\\d{3} \\(\\d{3}\\) \\d{3}-\\d{4}$')]],
    address: [this.data.address, Validators.required],
    salary: [this.data.salary, [Validators.required, Validators.pattern('^[$€]?\\d+(\\,\\d{3})*(\\.\\d{1,2})?$')]],
  });

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecordsEntity
  ) {}

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
