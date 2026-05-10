import { Component } from '@angular/core';

@Component({
  selector: 'app-commandes',
  imports: [],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class Commandes {
  produits: any[] = [{fournisseur: 'fournisseur1@example.com', name: 'Poutre Acier', description: 'H-Section 400mm', price: 100, quantite: 0},
                    {fournisseur: 'fournisseur2@example.com', name: 'Aluminium', description: 'H-Section 300mm', price: 150, quantite: 0},
                    {fournisseur: 'fournisseur3@example.com', name: 'Poutre Fer', description: 'H-Section 500mm', price: 200, quantite: 0},
                    {fournisseur: 'fournisseur1@example.com', name: 'Poutre PVC', description: 'H-Section 200mm', price: 50, quantite: 0},
                    {fournisseur: 'fournisseur2@example.com', name: 'Poutre Bois', description: 'H-Section 600mm', price: 120, quantite: 0},
                    {fournisseur: 'fournisseur3@example.com', name: 'Poutre Bois', description: 'H-Section 600mm', price: 180, quantite: 0},
                    {fournisseur: 'fournisseur1@example.com', name: 'Poutre Bois', description: 'H-Section 600mm', price: 240, quantite: 0},
                    {fournisseur: 'fournisseur2@example.com', name: 'Poutre Bois', description: 'H-Section 600mm', price: 300, quantite: 0},
                    {fournisseur: 'fournisseur3@example.com', name: 'Poutre Bois', description: 'H-Section 600mm', price: 360, quantite: 0},
                    {fournisseur: 'fournisseur1@example.com', name: 'Poutre Bois', description: 'H-Section 600mm', price: 420, quantite: 0}
  ];
  fournisseur: any[] = [{nom: 'Moussa', email: 'fournisseur1@example.com', telephone: '123456789'},
                        {nom: 'Ahmed', email: 'fournisseur2@example.com', telephone: '987654321'},
                        {nom: 'Fatou', email: 'fournisseur3@example.com', telephone: '456789123'}
  ];

  fourni = ""; // Contiendra l'email
  nomFournisseurSelectionne = "";

  selectionnerFournisseur(f: any) {
    this.fourni = f.email;
    this.nomFournisseurSelectionne = f.nom;
    // Optionnel : réinitialiser les quantités si on change de fournisseur ?
    // this.produits.forEach(p => p.quantite = 0);
  }
  calculerTotal() {
    return this.produits.reduce((sum, item) => sum + (item.quantite * item.price), 0);
  }
  envoyerCommande() {
    if (!this.fourni) {
      alert("Veuillez choisir un fournisseur !");
      return;
    }

    // Filtrer uniquement les produits commandés pour ce fournisseur
    const produitsCommandes = this.produits
      .filter(p => p.quantite > 0 && p.fournisseur === this.fourni)
      .map(p => `- ${p.quantite}x ${p.name} (${p.quantite * p.price} FCFA)`)
      .join('%0D%0A');

    if (!produitsCommandes) {
      alert("Votre panier est vide !");
      return;
    }
    const sujet = "Commande - Supermarché";
    const corps = "Bonjour ${this.nomFournisseurSelectionne},%0D%0A%0D%0A" +
                  "Voici ma commande :%0D%0A${produitsCommandes}%0D%0A%0D%0A" +
                  "Total : ${this.calculerTotal()} FCFA.%0D%0A%0D%0AMerci !";

    window.location.href = 'mailto:${this.fourni}?subject=${encodeURIComponent(sujet)}&body=${corps}';
  }
}
