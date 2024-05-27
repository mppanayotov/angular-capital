import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogViewRecordComponent } from './dialog-view-record/dialog-view-record.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatTooltipModule, ClipboardModule],
    declarations: [DialogViewRecordComponent],
    exports: [DialogViewRecordComponent],
})
export class RecordListDialogViewRecordModule {}
