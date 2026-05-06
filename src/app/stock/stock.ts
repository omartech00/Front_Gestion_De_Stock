import { Component } from '@angular/core';

@Component({
  selector: 'app-stock',
  imports: [],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
  produits: any[] = [{id: 1, name: 'Produit 1', categorie: 'Catégorie 1', stock: 100, status: 'En stock' },
                    {id: 2, name: 'Produit 2', categorie: 'Catégorie 2', stock: 5, status: 'Stock bas' },
                    {id: 3, name: 'Produit 3', categorie: 'Catégorie 3', stock: 0, status: 'En rupture' },
                    {id: 4, name: 'Produit 4', categorie: 'Catégorie 4', stock: 150, status: 'En stock' },
                    {id: 5, name: 'Produit 5', categorie: 'Catégorie 5', stock: 8, status: 'Stock bas' },
                    {id: 6, name: 'Produit 6', categorie: 'Catégorie 6', stock: 25, status: 'En stock' },
                    {id: 7, name: 'Produit 7', categorie: 'Catégorie 7', stock: 0, status: 'En rupture' },
                    {id: 8, name: 'Produit 8', categorie: 'Catégorie 8', stock: 10, status: 'Stock bas' },
                    {id: 9, name: 'Produit 9', categorie: 'Catégorie 9', stock: 50, status: 'En stock' },
                    
                    ];
}
