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
  private apiService = inject(ApiService);

  produits = signal<StockItem[]>([]);
  loading  = signal(true);
  error    = signal('');

  ngOnInit(): void {
    this.apiService.getProduits().subscribe({
      next: (data: any) => {
        this.produits.set(data.results ?? data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur produits :', err);
        this.error.set('Impossible de charger les produits');
        this.loading.set(false);
      }
    });
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
