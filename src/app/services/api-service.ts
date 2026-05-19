import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stock {
  id: number;
  libelle: string;
  prix_unitaire: number;
  quantite: number;
  seuil_alert: number;
  fournisseur: Fournisseur;
  en_alerte: boolean;
}
export interface Fournisseur {
  id: number;
  societe: string;
  contact: string;
}
export interface Commande {
  id: number;
  produit: Stock;
  fournisseur: Fournisseur;
  contact: number;
  date: string;
}

export interface Vente {
  id: number;
  data: string;
  montant_total: number;
  vendeur: Vendeur;
  lignes: LigneVente[];
}

export interface LigneVente {
  id: number;
  produit: Stock;
  quantite: number;
}

export interface Vendeur {
  id: number;
  username: string;
  email: string;
}




@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private http = inject(HttpClient);

  private apiUrl = "http://127.0.0.1:8000/api";
  produits = signal<Stock[]>([]);
  loading  = signal(false);

  getProduits(): Observable<Stock[]> {
    return this.http.get<Stock[]>(
      `${this.apiUrl}/produits/`
    );
  }
updateProduit(id: number, quantite: number): Observable<Stock> {
  return this.http.patch<Stock>(
    `${this.apiUrl}/produits/${id}/`, { quantite }
  );
}

  chargerProduits() {
    if (this.produits().length > 0) return;

    this.loading.set(true);
    this.http.get<any>(`${this.apiUrl}/produits/`).subscribe({
      next: (data) => {
        this.produits.set(data.results ?? data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(
      `${this.apiUrl}/fournisseurs/`
    );
  }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(
      `${this.apiUrl}/commandes/`
    );
  }

  getVentes(): Observable<Vente[]> {
    return this.http.get<Vente[]>(
      `${this.apiUrl}/ventes/`
    );
  }

  createVente(data: any): Observable<Vente> {
    return this.http.post<Vente>(
      `${this.apiUrl}/ventes/`, data
    );
  }

  getVendeurs(): Observable<Vendeur[]> {
    return this.http.get<Vendeur[]>(
      `${this.apiUrl}/vendeurs/`
    );
  }

}
