import { Component, ViewChild } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { Router } from '@angular/router';
import { AuthService } from '@capital/services/auth-service';

@Component({
  selector: 'capital-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(MatNavList) navList!: MatNavList;

  opened = false;
  role = this.authService.role();
  expirationTimer$ = this.authService.expirationTimer();

  constructor(private authService: AuthService, private router: Router) {}

  setActiveLink(link: string): boolean {
    return link === this.router.url;
  }

  logout(): void {
    this.authService.logout();
  }
}
