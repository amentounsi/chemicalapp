import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from './produit.service';
import { Fournisseur } from './fournisseur.service';

export interface Commande {
  id?: number;
  numeroCommande?: string;
  dateCommande?: string;
  quantite: number;
  statut?: string;
  commentaire?: string;
  prixUnitaire: number;
  prixTotal?: number;
  produit: Produit;
  fournisseur: Fournisseur;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private url = 'http://localhost:8080/commandes';

  constructor(private http: HttpClient) {}
  
  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.url);
  }

  createCommande(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(`${this.url}/ajouter`, commande);
  }

  updateCommande(id: number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.url}/${id}`, commande);
  }

  updateCommandeStatus(id: number, statut: string): Observable<Commande> {
    return this.http.put<Commande>(`${this.url}/${id}/statut`, null, { params: { statut } as any });
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.url}/${id}`);
  }
}
