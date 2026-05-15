import { Component, HostBinding, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { LoginComponent } from './login/login';
import { AuthService } from './log-services/auth-service';

@Component({
  selector: 'app-root',
  imports: [ LoginComponent, RouterModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);  // public pour le template
  menuOuvert = false;

  @HostBinding('class.logged-in')
  get isLoggedIn() {
    return this.authService.isLoggedIn();  // ← appel du signal comme une fonction
  }

  toggleMenu() { this.menuOuvert = !this.menuOuvert; }

  naviguer(page: string) {
    this.menuOuvert = false;  // ← ferme le menu après clic sur mobile
  }

  logout() {
    this.authService.logout();
  }
}
