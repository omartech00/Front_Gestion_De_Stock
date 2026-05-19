import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Stock as StockItem } from '../services/api-service';

@Component({
  selector: 'app-stock',    // ← vérifiez ce sélecteur
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock implements OnInit {
  apiService = inject(ApiService);

  ngOnInit() {
    this.apiService.chargerProduits();
  }

  getStatut(p: StockItem): string {
    if (p.quantite === 0)            return 'Rupture';
    if (p.quantite <= p.seuil_alert) return 'Stock bas';
    return 'En stock';
  }

  getBadgeClass(p: StockItem): string {
    if (p.quantite === 0)            return 'red';
    if (p.quantite <= p.seuil_alert) return 'orange';
    return 'green';
  }
}
