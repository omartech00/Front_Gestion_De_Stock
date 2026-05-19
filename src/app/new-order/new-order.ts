import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ApiService, Stock as StockItem } from '../services/api-service';
import { FormsModule } from '@angular/forms';

// Produit avec quantité commandée séparée du stock réel
interface ProduitCommande extends StockItem {
  qteCommande: number;
}

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-order.html',
  styleUrl: './new-order.css',
})
export class NewOrder implements OnInit {
  apiService = inject(ApiService);

  // Copie locale avec qteCommande = 0
  panier = signal<ProduitCommande[]>([]);

  ngOnInit() {
    this.apiService.chargerProduits();

    // Dès que les produits sont chargés, on crée le panier
    const interval = setInterval(() => {
      if (this.apiService.produits().length > 0) {
        this.panier.set(
          this.apiService.produits().map(p => ({ ...p, qteCommande: 0 }))
        );
        clearInterval(interval);
      }
    }, 100);
  }

  ajouter(item: ProduitCommande) {
    if (item.qteCommande < item.quantite) {  // ne dépasse pas le stock
      item.qteCommande++;
    }
  }

  retirer(item: ProduitCommande) {
    if (item.qteCommande > 0) item.qteCommande--;
  }

  // Getter total — utilisable dans le template via total
  get total(): number {
    return this.panier().reduce((sum, p) => sum + p.qteCommande * p.prix_unitaire, 0);
  }

  get panierNonVide(): boolean {
    return this.total > 0;
  }

  genererFacture() {
    const commandes = this.panier().filter(p => p.qteCommande > 0);
    if (commandes.length === 0) return;

    const doc  = new jsPDF();
    const date = new Date().toLocaleDateString('fr-FR');

    doc.setFontSize(18);
    doc.text('FACTURE SUPERMARCHÉ', 14, 20);
    doc.setFontSize(11);
    doc.text(`Date : ${date}`, 14, 30);
    doc.text(`Client : Client Comptant`, 14, 36);

    autoTable(doc, {
      startY: 45,
      head: [['Produit', 'Quantité', 'Prix Unitaire', 'Total']],
      body: commandes.map(p => [
        p.libelle,
        p.qteCommande,
        `${p.prix_unitaire} FCFA`,
        `${p.qteCommande * p.prix_unitaire} FCFA`
      ]),
      theme: 'grid',
      headStyles: { fillColor: [230, 145, 56] }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`TOTAL À PAYER : ${this.total} FCFA`, 14, finalY);
    doc.save(`Facture_${date}.pdf`);

    // ✅ 2. CRÉER LA VENTE
    const lignes = commandes.map(p => ({
      produit_id: p.id,
      quantite: p.qteCommande,
      prix: p.prix_unitaire
    }));

    const montantTotal = this.total;

    this.apiService.createVente({
      vendeur_id: null,
      montant_total: montantTotal,
      lignes_write: lignes
    }).subscribe({
      next: (vente) => {
        console.log('✅ Vente créée:', vente);

        // 3. Mettre à jour le stock pour chaque produit commandé
        commandes.forEach(p => {
          const nouvelleQuantite = p.quantite - p.qteCommande;

          this.apiService.updateProduit(p.id, nouvelleQuantite).subscribe({
            next: (produitMisAJour) => {
              // Met à jour le signal local aussi
              this.apiService.produits.update(liste =>
                liste.map(item =>
                  item.id === produitMisAJour.id ? produitMisAJour : item
                )
              );
              console.log(`✅ Stock mis à jour : ${p.libelle} → ${nouvelleQuantite}`);
            },
            error: (err) => console.error(`❌ Erreur mise à jour ${p.libelle}:`, err)
          });
        });

        // 4. Réinitialiser le panier
        this.panier.update(items => items.map(p => ({ ...p, qteCommande: 0 })));
      },
      error: (err) => console.error('❌ Erreur création vente:', err)
    });
  }
}
