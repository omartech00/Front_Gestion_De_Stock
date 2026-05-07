import { Component } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-new-order',
  imports: [],
  templateUrl: './new-order.html',
  styleUrl: './new-order.css',
})
export class NewOrder {
  price:number = 8000;
  produits: any[] = [{id: 1, name: 'Poutre Acier', description: 'H-Section 400mm', price: 100},
                    {id: 2, name: 'Aluminium', description: 'H-Section 300mm', price: 150},
                    {id: 3, name: 'Poutre Fer', description: 'H-Section 500mm', price: 200},
                    {id: 4, name: 'Poutre PVC', description: 'H-Section 200mm', price: 50},
                    {id: 5, name: 'Poutre Bois', description: 'H-Section 600mm', price: 120},
                    {id: 6, name: 'Poutre Bois', description: 'H-Section 600mm', price: 180},
                    {id: 7, name: 'Poutre Bois', description: 'H-Section 600mm', price: 240},
                    {id: 8, name: 'Poutre Bois', description: 'H-Section 600mm', price: 300},
                    {id: 9, name: 'Poutre Bois', description: 'H-Section 600mm', price: 360},
                    {id: 10, name: 'Poutre Bois', description: 'H-Section 600mm', price: 420}

                    ];
}
