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

}
