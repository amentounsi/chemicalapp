import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Produit {
  id?: number;       
  name: string;     
  description?: string; 
  domaine?: string;  
  contact?: string; 
  volume?: number; // stock disponible
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private url = 'http://localhost:8080/produits';

  constructor(private http: HttpClient) {}
  
  getProducts(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.url);
  }

  createProduct(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.url}/ajouter`, produit);
  }

  updateProduct(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.url}/${id}`, produit);
  }

  restockProduct(id: number, quantite: number): Observable<Produit> {
    return this.http.post<Produit>(`${this.url}/${id}/restocker`, null, { params: { quantite } as any });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getProductById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.url}/${id}`);
  }

  apiUrl<T>(apiUrl: any): Observable<Produit[]> {
    throw new Error('Method not implemented.');
  }
}
