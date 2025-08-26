import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Benificiaire {
  id?: number;
  nom: string;
  prenom: string;
  cin: string;
  service: string;
  adresse: string;
  telephone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class BenificiaireService {
  private url = 'http://localhost:8080/benificiaires';

  constructor(private http: HttpClient) {}
  
  getBenificiaires(): Observable<Benificiaire[]> {
    return this.http.get<Benificiaire[]>(this.url);
  }

  createBenificiaire(benificiaire: Benificiaire): Observable<Benificiaire> {
    return this.http.post<Benificiaire>(`${this.url}/ajouter`, benificiaire);
  }

  updateBenificiaire(id: number, benificiaire: Benificiaire): Observable<Benificiaire> {
    return this.http.put<Benificiaire>(`${this.url}/${id}`, benificiaire);
  }

  deleteBenificiaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getBenificiaireById(id: number): Observable<Benificiaire> {
    return this.http.get<Benificiaire>(`${this.url}/${id}`);
  }
}
