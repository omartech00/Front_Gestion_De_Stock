import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Stock as StockItem, Fournisseur } from '../services/api-service';

interface ProduitCommande extends StockItem {
  qteCommande: number;
}

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class Commandes implements OnInit {
  apiService = inject(ApiService);

  panier               = signal<ProduitCommande[]>([]);
  fournisseurSelectionne = signal<Fournisseur | null>(null);

  // Fournisseurs uniques extraits des produits — pas de requête supplémentaire
  fournisseurs = computed<Fournisseur[]>(() => {
    const map = new Map<number, Fournisseur>();
    this.apiService.produits().forEach(p => {
      if (p.fournisseur) map.set(p.fournisseur.id, p.fournisseur);
    });
    return Array.from(map.values());
  });

  // Produits filtrés par fournisseur sélectionné
  produitsFournisseur = computed<ProduitCommande[]>(() => {
    const f = this.fournisseurSelectionne();
    if (!f) return [];
    return this.panier().filter(p => p.fournisseur?.id === f.id);
  });

  ngOnInit() {
    this.apiService.chargerProduits();
    const interval = setInterval(() => {
      if (this.apiService.produits().length > 0) {
        this.panier.set(
          this.apiService.produits().map(p => ({ ...p, qteCommande: 0 }))
        );
        clearInterval(interval);
      }
    }, 100);
  }

  selectionnerFournisseur(f: Fournisseur) {
    this.fournisseurSelectionne.set(f);
    this.panier.update(items => items.map(p => ({ ...p, qteCommande: 0 })));
  }

  ajouter(item: ProduitCommande) {
    if (item.qteCommande < item.quantite) {
      item.qteCommande++;
      this.panier.update(p => [...p]); // force re-render
    }
  }

  retirer(item: ProduitCommande) {
    if (item.qteCommande > 0) {
      item.qteCommande--;
      this.panier.update(p => [...p]);
    }
  }

  get total(): number {
    return this.panier().reduce((sum, p) => sum + p.qteCommande * p.prix_unitaire, 0);
  }

  get panierNonVide(): boolean {
    return this.panier().some(p => p.qteCommande > 0);
  }

  envoyerCommande() {
    const f = this.fournisseurSelectionne();
    if (!f) { alert('Veuillez choisir un fournisseur !'); return; }
    if (!this.panierNonVide) { alert('Votre panier est vide !'); return; }

    const lignes = this.panier()
      .filter(p => p.qteCommande > 0)
      .map(p => `- ${p.qteCommande}x ${p.libelle} (${p.qteCommande * p.prix_unitaire} FCFA)`)
      .join('\n');

    const sujet = encodeURIComponent('Commande — Supermarché');
    const corps = encodeURIComponent(
      `Bonjour ${f.societe},\n\nVoici ma commande :\n${lignes}\n\nTotal : ${this.total} FCFA.\n\nMerci !`
    );

    window.location.href = `mailto:${f.contact}?subject=${sujet}&body=${corps}`;
  }
}
