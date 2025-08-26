import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Fournisseur {
  id?: number;
  nom: string;
  specialite: string;
  localisation: string;
  email: string;
  telephone: string;
}

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private url = 'http://localhost:8080/fournisseurs';

  constructor(private http: HttpClient) {}
  
  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.url);
  }

  createFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.url}/ajouter`, fournisseur);
  }

  updateFournisseur(id: number, fournisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.url}/${id}`, fournisseur);
  }

  deleteFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getFournisseurById(id: number): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.url}/${id}`);
  }
}
