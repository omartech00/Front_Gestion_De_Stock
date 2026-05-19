import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService, Vente as VenteItem } from '../services/api-service';

@Component({
  selector: 'app-ventes',
  imports: [CommonModule, DatePipe],
  templateUrl: './ventes.html',
  styleUrl: './ventes.css',
})
export class Ventes implements OnInit {
  private apiService = inject(ApiService);

  ventes = signal<VenteItem[]>([]);
  loading  = signal(true);
  error    = signal('');

  ngOnInit(): void {
    this.apiService.getVentes().subscribe({
      next: (data: any) => {
        this.ventes.set(data.results ?? data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur ventes :', err);
        this.error.set('Impossible de charger les ventes');
        this.loading.set(false);
      }
    });
  }
}

