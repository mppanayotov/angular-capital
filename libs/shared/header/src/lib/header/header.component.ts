import { Component } from '@angular/core';
import { AuthService } from '@capital/services/auth-service';

@Component({
  selector: 'capital-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  role = this.authService.role();

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
