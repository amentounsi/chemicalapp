import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Exemple d'initialisation de produits
    this.produits = [
      { id: 1, nom: 'Produit A', prix: 25.50 },
      { id: 2, nom: 'Produit B', prix: 49.99 },
      { id: 3, nom: 'Produit C', prix: 10.00 }
    ];
  }

}
