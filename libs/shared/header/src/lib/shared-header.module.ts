import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class SharedHeaderModule {}
