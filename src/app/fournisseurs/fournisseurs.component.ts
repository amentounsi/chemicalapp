import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fournisseur, FournisseurService } from '../services/fournisseur.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})
export class FournisseursComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  fournisseurForm: FormGroup;
  isFormVisible = false;
  isEditing = false;
  editingFournisseurId: number | null = null;
  isLoading = false;
  message = '';
  messageType = '';

  constructor(
    private router: Router,
    private fournisseurService: FournisseurService,
    private fb: FormBuilder
  ) {
    this.fournisseurForm = this.fb.group({
      nom: ['', Validators.required],
      specialite: ['', Validators.required],
      localisation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    this.isLoading = true;
    this.fournisseurService.getFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading fournisseurs:', error);
        this.showMessage('Erreur lors du chargement des fournisseurs', 'error');
        this.isLoading = false;
      }
    });
  }

  addFournisseur() {
    this.isFormVisible = true;
    this.isEditing = false;
    this.editingFournisseurId = null;
    this.fournisseurForm.reset();
    this.clearMessage();
  }

  editFournisseur(fournisseur: Fournisseur) {
    if (fournisseur.id == null) {
      return;
    }
    this.isFormVisible = true;
    this.isEditing = true;
    this.editingFournisseurId = fournisseur.id;
    this.fournisseurForm.patchValue({
      nom: fournisseur.nom,
      specialite: fournisseur.specialite,
      localisation: fournisseur.localisation,
      email: fournisseur.email,
      telephone: fournisseur.telephone
    });
    this.clearMessage();
  }

  deleteFournisseur(id?: number) {
    if (id == null) {
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.isLoading = true;
      this.fournisseurService.deleteFournisseur(id).subscribe({
        next: () => {
          this.loadFournisseurs();
          this.showMessage('Fournisseur supprimé avec succès', 'success');
        },
        error: (error) => {
          console.error('Error deleting fournisseur:', error);
          this.showMessage('Erreur lors de la suppression du fournisseur', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.fournisseurForm.valid) {
      this.isLoading = true;
      const formData = this.fournisseurForm.value;
      
      if (this.isEditing && this.editingFournisseurId) {
        // Update existing fournisseur
        const updatedFournisseur: Fournisseur = {
          id: this.editingFournisseurId,
          ...formData
        };
        this.fournisseurService.updateFournisseur(this.editingFournisseurId, updatedFournisseur).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadFournisseurs();
            this.cancelForm();
            this.showMessage('Fournisseur mis à jour avec succès', 'success');
          },
          error: (error) => {
            console.error('Error updating fournisseur:', error);
            this.showMessage('Erreur lors de la mise à jour du fournisseur', 'error');
            this.isLoading = false;
          }
        });
      } else {
        // Add new fournisseur
        const newFournisseur: Fournisseur = {
          ...formData
        };
        this.fournisseurService.createFournisseur(newFournisseur).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadFournisseurs();
            this.cancelForm();
            this.showMessage('Fournisseur ajouté avec succès', 'success');
          },
          error: (error) => {
            console.error('Error creating fournisseur:', error);
            this.showMessage('Erreur lors de l\'ajout du fournisseur', 'error');
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
    this.editingFournisseurId = null;
    this.fournisseurForm.reset();
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
