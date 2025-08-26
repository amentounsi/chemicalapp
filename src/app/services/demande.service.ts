import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from './produit.service';
import { Benificiaire } from './benificiaire.service';

export interface Demande {
  id?: number;
  numeroDemande?: string;
  dateDemande?: string;
  quantite: number;
  statut?: string;
  motif: string;
  commentaire?: string;
  dateLivraisonSouhaitee?: string;
  produit: Produit;
  benificiaire: Benificiaire;
}

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private url = 'http://localhost:8080/demandes';

  constructor(private http: HttpClient) {}
  
  getDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.url);
  }

  createDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(`${this.url}/ajouter`, demande);
  }

  updateDemande(id: number, demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(`${this.url}/${id}`, demande);
  }

  updateDemandeStatus(id: number, statut: string): Observable<Demande> {
    return this.http.put<Demande>(`${this.url}/${id}/statut`, null, { params: { statut } as any });
  }

  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getDemandeById(id: number): Observable<Demande> {
    return this.http.get<Demande>(`${this.url}/${id}`);
  }
}
