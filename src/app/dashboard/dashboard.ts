import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels
} from 'ng-apexcharts';

import { ApiService, Stock, Vente } from '../services/api-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  apiService = inject(ApiService);

  // --- État ---
  ventes = signal<Vente[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  periodeDays = signal<7 | 30>(7);

  // --- Chart ---
  chartSeries = signal<ApexAxisChartSeries>([
    { name: 'Produits vendus', data: [0, 0, 0, 0, 0, 0, 0] }
  ]);

  chartDetails: ApexChart = {
    type: 'line',
    height: 320,
    toolbar: { show: false },
    zoom: { enabled: false }
  };

  chartXAxis: ApexXAxis = {
    categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  };

  chartStroke: ApexStroke = {
    curve: 'smooth',
    width: 4
  };

  chartDataLabels: ApexDataLabels = {
    enabled: false
  };

  // --- Lifecycle ---
  ngOnInit() {
    this.apiService.chargerProduits();

    this.apiService.getVentes().subscribe({
      next: (data: any) => {
        this.ventes.set(data.results ?? data); // ✅ gestion pagination Django REST
        this.loading.set(false);
        this.mettreAJourChart();
      },
      error: (err) => {
        console.error(err);
        this.error.set('Impossible de charger les ventes.');
        this.loading.set(false);
      }
    });
  }

  // --- Computed stats ---
  totalArticles = computed(() => this.apiService.produits().length);

  produitsAlerte = computed(() =>
    this.apiService.produits().filter(p => p.quantite <= p.seuil_alert).length
  );

  ruptureStock = computed(() =>
    this.apiService.produits().filter(p => p.quantite === 0).length
  );

  // --- Actions ---
  changerPeriode(jours: 7 | 30) {
    this.periodeDays.set(jours);
    this.mettreAJourChart();
  }

  // --- Génération des données chart ---
  mettreAJourChart() {
    if (this.periodeDays() === 7) {
      this.genererFluxHebdomadaire();
    } else {
      this.genererFlux30Jours();
    }
  }

  genererFluxHebdomadaire() {
    const jours = [0, 0, 0, 0, 0, 0, 0];
    const maintenant = new Date();
    const il7Jours = new Date();
    il7Jours.setDate(maintenant.getDate() - 7);

    this.chartXAxis = {
      categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    };

    this.ventes().forEach(v => {
      const date = new Date(v.data);
      if (isNaN(date.getTime())) return;
      if (date < il7Jours) return;

      const lignes = (v as any).lignes ?? [];

      lignes.forEach((l: any) => {
        const qte = Number(l.quantite ?? 0);

        let jour = date.getDay();
        jour = jour === 0 ? 6 : jour - 1;

        jours[jour] += qte;
      });
    });

    this.chartSeries.set([
      { name: 'Produits vendus', data: [...jours] }
    ]);
  }

  genererFlux30Jours() {
    const maintenant = new Date();
    const il30Jours = new Date();
    il30Jours.setDate(maintenant.getDate() - 30);

    const labels: string[] = [];
    const buckets: Record<string, number> = {};

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(maintenant.getDate() - i);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      const label = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
      labels.push(label);
      buckets[key] = 0;
    }

    this.ventes().forEach(v => {
      const date = new Date(v.data);
      if (isNaN(date.getTime())) return;
      if (date < il30Jours) return;

      const lignes = (v as any).lignes ?? [];

      lignes.forEach((l: any) => {
        const qte = Number(l.quantite ?? 0);

        const key = date.toISOString().slice(0, 10);
        if (key in buckets) {
          buckets[key] += qte;
        }
      });
    });
    this.chartXAxis = { categories: labels };
    this.chartSeries.set([
      { name: 'Produits vendus', data: Object.values(buckets) }
    ]);
  }
}
