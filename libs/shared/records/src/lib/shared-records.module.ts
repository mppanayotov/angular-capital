import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromRecords from './+state/records.reducer';
import { RecordsEffects } from './+state/records.effects';

@NgModule({
    imports: [CommonModule, StoreModule.forFeature(fromRecords.RECORDS_FEATURE_KEY, fromRecords.recordsReducer), EffectsModule.forFeature([RecordsEffects])],
})
export class SharedRecordsModule {}
