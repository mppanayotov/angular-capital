import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAddRecordComponent } from './dialog-add-record/dialog-add-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatButtonModule],
    declarations: [DialogAddRecordComponent],
    exports: [DialogAddRecordComponent],
})
export class RecordListDialogAddRecordModule {}
