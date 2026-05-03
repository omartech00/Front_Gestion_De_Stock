import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { APropos } from './a-propos/a-propos';
import { Commandes } from './commandes/commandes';
import { Fournisseur } from './fournisseur/fournisseur';
import { NewOrder } from './new-order/new-order';
import { Stock } from './stock/stock';
import { Ventes } from './ventes/ventes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, APropos, Commandes, Fournisseur, NewOrder, Stock, Ventes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My Stock');
  clic = "";
}
