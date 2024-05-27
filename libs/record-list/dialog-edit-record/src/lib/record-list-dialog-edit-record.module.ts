import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogEditRecordComponent } from './dialog-edit-record/dialog-edit-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule],
    declarations: [DialogEditRecordComponent],
    exports: [DialogEditRecordComponent],
})
export class RecordListDialogEditRecordModule {}
