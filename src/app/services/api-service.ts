import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stock {
  id: number;
  libelle: string;
  prix_unitaire: number;
  quantite: number;
  seuil_alert: number;
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
  data: string;           // nom exact du champ API
  montant_total: number;
  quantite_vendue: number;
  produit: Stock;
  vendeur: Vendeur;
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

  getProduits(): Observable<Stock[]> {
    return this.http.get<Stock[]>(
      `${this.apiUrl}/produits/`
    );
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

  getVendeurs(): Observable<Vendeur[]> {
    return this.http.get<Vendeur[]>(
      `${this.apiUrl}/vendeurs/`
    );
  }

}
