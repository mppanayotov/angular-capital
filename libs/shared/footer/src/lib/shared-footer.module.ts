import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, MatIconModule],
    declarations: [FooterComponent],
    exports: [FooterComponent],
})
export class SharedFooterModule {}
