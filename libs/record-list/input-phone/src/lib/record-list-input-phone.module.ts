import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPhoneComponent } from './input-phone/input-phone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [InputPhoneComponent],
  exports: [InputPhoneComponent],
})
export class RecordListInputPhoneModule {}
