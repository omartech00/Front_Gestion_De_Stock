import { Component } from '@angular/core';
import { NgClass } from "@angular/common";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-new-order',
  imports: [],
  templateUrl: './new-order.html',
  styleUrl: './new-order.css',
})
export class NewOrder {
  // total: number = 0;
  produits: any[] = [{id: 1, name: 'Poutre Acier', description: 'H-Section 400mm', price: 100, quantite: 0},
                    {id: 2, name: 'Aluminium', description: 'H-Section 300mm', price: 150, quantite: 0},
                    {id: 3, name: 'Poutre Fer', description: 'H-Section 500mm', price: 200, quantite: 0},
                    {id: 4, name: 'Poutre PVC', description: 'H-Section 200mm', price: 50, quantite: 0},
                    {id: 5, name: 'Poutre Bois', description: 'H-Section 600mm', price: 120, quantite: 0},
                    {id: 6, name: 'Poutre Bois', description: 'H-Section 600mm', price: 180, quantite: 0},
                    {id: 7, name: 'Poutre Bois', description: 'H-Section 600mm', price: 240, quantite: 0},
                    {id: 8, name: 'Poutre Bois', description: 'H-Section 600mm', price: 300, quantite: 0},
                    {id: 9, name: 'Poutre Bois', description: 'H-Section 600mm', price: 360, quantite: 0},
                    {id: 10, name: 'Poutre Bois', description: 'H-Section 600mm', price: 420, quantite: 0}

                    ];


  genererFacture() {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // 1. En-tête de la facture
    doc.setFontSize(18);
    doc.text('FACTURE SUPERMARCHÉ', 14, 20);
    doc.setFontSize(11);
    doc.text(`Date: ${date}`, 14, 30);
    doc.text(`Client: Client Comptant`, 14, 35);

    // 2. Préparation des données du tableau
    // On ne prend que les produits commandés (quantité > 0)
    const produitsCommandes = this.produits
      .filter(item => item.quantite > 0)
      .map(item => [
        item.name,
        item.quantite,
        `${item.price} FCFA`,
        `${item.quantite * item.price} FCFA`
      ]);

    // 3. Génération du tableau
    autoTable(doc, {
      startY: 45,
      head: [['Produit', 'Quantité', 'Prix Unitaire', 'Total']],
      body: produitsCommandes,
      theme: 'grid',
      headStyles: { fillColor: [230, 145, 56] } // La couleur orange #e69138
    });

    // 4. Ajout du Total final
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    const totalGlobal = this.produits.reduce((sum, item) => sum + (item.quantite * item.price), 0);

    doc.setFontSize(14);
    doc.text(`TOTAL À PAYER : ${totalGlobal} FCFA`, 14, finalY);

    // 5. Téléchargement du fichier
    doc.save(`Facture_${date}.pdf`);
  }

}
