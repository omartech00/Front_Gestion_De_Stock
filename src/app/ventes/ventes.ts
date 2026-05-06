import { Component } from '@angular/core';

@Component({
  selector: 'app-ventes',
  imports: [],
  templateUrl: './ventes.html',
  styleUrl: './ventes.css',
})
export class Ventes {
  ventes: any[] = [{id: 9900, date: '2026-01-01 15h30min05s', nbr_article: '8', facture: 10000, vendeur: 'Moussa', status: 'Validé' },
                  {id: 9901, date: '2026-01-02 10h15min20s', nbr_article: '5', facture: 7500, vendeur: 'Amina', status: 'Validé'},
                  {id: 9902, date: '2026-01-03 14h45min30s', nbr_article: '12', facture: 15000, vendeur: 'Karim', status: 'Annulé'  },
                  {id: 9903, date: '2026-01-04 09h20min10s', nbr_article: '3', facture: 4500, vendeur: 'Moussa', status: 'Validé' },
                  {id: 9904, date: '2026-01-05 16h50min40s', nbr_article: '7', facture: 10500, vendeur: 'Amina', status: 'Validé' },
                  {id: 9905, date: '2026-01-06 11h10min50s', nbr_article: '10', facture: 12500, vendeur: 'Amina', status: 'Validé' },
                  {id: 9906, date: '2026-01-07 13h25min15s', nbr_article: '4', facture: 6000, vendeur: 'Moussa', status: 'Validé' },
                  {id: 9907, date: '2026-01-08 12h00min00s', nbr_article: '6', facture: 9000, vendeur: 'Amina', status: 'Validé' }
                    ];
}
