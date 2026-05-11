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

  @HostBinding('class.logged-in')
  get isLoggedIn() {
    return this.authService.isLoggedIn();  // ← appel du signal comme une fonction
  }

  logout() {
    this.authService.logout();
  }
}
