import { Component, inject, input } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);

  isLogin = input<boolean>(true);

  logout(): void {
    this.authService.logoutUser();
  }
}
