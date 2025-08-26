import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit, ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
 
  prod: Produit[] = [];
  produitForm: FormGroup;
  isFormVisible = false;
  isEditing = false;
  editingProduitId: number | null = null;
  isLoading = false;
  message = '';
  messageType = '';

  constructor(
    private router: Router, 
    private prodserv: ProduitService,
    private fb: FormBuilder
  ) {
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      domaine: ['', Validators.required],
      contact: ['', Validators.required],
      volume: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadProduit();
  }

  loadProduit() {
    this.isLoading = true;
    this.prodserv.getProducts().subscribe({
      next: (data) => {
        this.prod = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.showMessage('Erreur lors du chargement des produits', 'error');
        this.isLoading = false;
      }
    });
  }

  addProduit() {
    this.isFormVisible = true;
    this.isEditing = false;
    this.editingProduitId = null;
    this.produitForm.reset();
    this.clearMessage();
  }

  editProduit(produit: Produit) {
    if (produit.id == null) {
      return;
    }
    this.isFormVisible = true;
    this.isEditing = true;
    this.editingProduitId = produit.id;
    this.produitForm.patchValue({
      name: produit.name,
      description: produit.description || '',
      domaine: produit.domaine || '',
      contact: produit.contact || '',
      volume: produit.volume ?? 0
    });
    this.clearMessage();
  }

  deleteProduit(id?: number) {
    if (id == null) {
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.isLoading = true;
      this.prodserv.deleteProduct(id).subscribe({
        next: () => {
          this.loadProduit();
          this.showMessage('Produit supprimé avec succès', 'success');
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.showMessage('Erreur lors de la suppression du produit', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.produitForm.valid) {
      this.isLoading = true;
      const formData = this.produitForm.value;
      
      if (this.isEditing && this.editingProduitId) {
        // Update existing product
        const updatedProduit: Produit = {
          id: this.editingProduitId,
          ...formData
        };
        this.prodserv.updateProduct(this.editingProduitId, updatedProduit).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadProduit();
            this.cancelForm();
            this.showMessage('Produit mis à jour avec succès', 'success');
          },
          error: (error) => {
            console.error('Error updating product:', error);
            this.showMessage('Erreur lors de la mise à jour du produit', 'error');
            this.isLoading = false;
          }
        });
      } else {
        // Add new product
        const newProduit: Produit = {
          ...formData
        };
        this.prodserv.createProduct(newProduit).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadProduit();
            this.cancelForm();
            this.showMessage('Produit ajouté avec succès', 'success');
          },
          error: (error) => {
            console.error('Error creating product:', error);
            this.showMessage('Erreur lors de l\'ajout du produit', 'error');
            this.isLoading = false;
          }
        });
      }
    } else {
      this.showMessage('Veuillez remplir tous les champs obligatoires', 'error');
    }
  }

  cancelForm() {
    this.isFormVisible = false;
    this.isEditing = false;
    this.editingProduitId = null;
    this.produitForm.reset();
    this.clearMessage();
  }

  showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.clearMessage();
    }, 3000);
  }

  clearMessage() {
    this.message = '';
    this.messageType = '';
  }
}
