import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService, Fournisseur as StockItem } from '../services/api-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fournisseur',
  imports: [RouterModule],
  templateUrl: './fournisseur.html',
  styleUrl: './fournisseur.css',
})
export class Fournisseur implements OnInit {

  private apiService = inject(ApiService);

  fournisseurs = signal<StockItem[]>([]);
  loading  = signal(true);
  error    = signal('');

  ngOnInit(): void {
    this.apiService.getFournisseurs().subscribe({
      next: (data: any) => {
        this.fournisseurs.set(data.results ?? data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur fournisseur :', err);
        this.error.set('Impossible de charger les fournisseurs');
        this.loading.set(false);
      }
    });
  }
}
