import { Component } from '@angular/core';

@Component({
  selector: 'app-fournisseur',
  imports: [],
  templateUrl: './fournisseur.html',
  styleUrl: './fournisseur.css',
})
export class Fournisseur {
  fournisseurs: any[] = [
    {nom: 'Fournisseur 1', email: 'fournisseur1@example.com', tel: '0123456789', action: 'Commander'},
    {nom: 'Fournisseur 2', email: 'fournisseur2@example.com', tel: '0123456789', action: 'Commander'},
    {nom: 'Fournisseur 3', email: 'fournisseur3@example.com', tel: '0123456789', action: 'Commander'},
    {nom: 'Fournisseur 4', email: 'fournisseur4@example.com', tel: '0123456789', action: 'Commander'},
    {nom: 'Fournisseur 5', email: 'fournisseur5@example.com', tel: '0123456789', action: 'Commander'}
  ];
}
