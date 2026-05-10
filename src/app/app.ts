import { Component, HostBinding, inject, signal } from '@angular/core';
import { Dashboard } from './dashboard/dashboard';
import { APropos } from './a-propos/a-propos';
import { Commandes } from './commandes/commandes';
import { Fournisseur } from './fournisseur/fournisseur';
import { NewOrder } from './new-order/new-order';
import { Stock } from './stock/stock';
import { Ventes } from './ventes/ventes';
import { LoginComponent } from './login/login';
import { AuthService } from './log-services/auth-service';

@Component({
  selector: 'app-root',
  imports: [ LoginComponent, Dashboard, APropos, Commandes, Fournisseur, NewOrder, Stock, Ventes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);  // public pour le template
  clic = 'dash';                      // page par défaut après login


  @HostBinding('class.logged-in')
  get isLoggedIn() {
    return this.authService.isLoggedIn();  // ← appel du signal comme une fonction
  }

  logout() {
    this.authService.logout();
    this.clic = 'dash';  // reset
  }
}
