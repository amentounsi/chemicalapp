import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Benificiaire, BenificiaireService } from '../services/benificiaire.service';

@Component({
  selector: 'app-benificiaires',
  templateUrl: './benificiaires.component.html',
  styleUrls: ['./benificiaires.component.css']
})
export class BenificiairesComponent implements OnInit {
  benificiaires: Benificiaire[] = [];
  benificiaireForm: FormGroup;
  isFormVisible = false;
  isEditing = false;
  editingBenificiaireId: number | null = null;
  isLoading = false;
  message = '';
  messageType = '';

  constructor(
    private benificiaireService: BenificiaireService,
    private fb: FormBuilder
  ) {
    this.benificiaireForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      service: ['', [Validators.required, Validators.minLength(5)]],
      adresse: ['', [Validators.required, Validators.minLength(10)]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadBenificiaires();
  }

  loadBenificiaires() {
    this.isLoading = true;
    this.benificiaireService.getBenificiaires().subscribe({
      next: (data) => {
        this.benificiaires = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading benificiaires:', error);
        this.showMessage('Erreur lors du chargement des bénéficiaires', 'error');
        this.isLoading = false;
      }
    });
  }

  addBenificiaire() {
    this.isFormVisible = true;
    this.isEditing = false;
    this.editingBenificiaireId = null;
    this.benificiaireForm.reset();
    this.clearMessage();
  }

  editBenificiaire(benificiaire: Benificiaire) {
    if (benificiaire.id == null) {
      return;
    }
    this.isFormVisible = true;
    this.isEditing = true;
    this.editingBenificiaireId = benificiaire.id;
    this.benificiaireForm.patchValue({
      nom: benificiaire.nom,
      prenom: benificiaire.prenom,
      cin: benificiaire.cin,
      service: benificiaire.service,
      adresse: benificiaire.adresse,
      telephone: benificiaire.telephone,
      email: benificiaire.email
    });
    this.clearMessage();
  }

  deleteBenificiaire(id?: number) {
    if (id == null) {
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bénéficiaire ?')) {
      this.isLoading = true;
      this.benificiaireService.deleteBenificiaire(id).subscribe({
        next: () => {
          this.loadBenificiaires();
          this.showMessage('Bénéficiaire supprimé avec succès', 'success');
        },
        error: (error) => {
          console.error('Error deleting benificiaire:', error);
          this.showMessage('Erreur lors de la suppression du bénéficiaire', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.benificiaireForm.valid) {
      this.isLoading = true;
      const formData = this.benificiaireForm.value;
      
      const benificiaireData: Benificiaire = {
        nom: formData.nom,
        prenom: formData.prenom,
        cin: formData.cin,
        service: formData.service,
        adresse: formData.adresse,
        telephone: formData.telephone,
        email: formData.email
      };
      
      if (this.isEditing && this.editingBenificiaireId) {
        // Update existing benificiaire
        this.benificiaireService.updateBenificiaire(this.editingBenificiaireId, benificiaireData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadBenificiaires();
            this.cancelForm();
            this.showMessage('Bénéficiaire mis à jour avec succès', 'success');
          },
          error: (error) => {
            console.error('Error updating benificiaire:', error);
            this.showMessage('Erreur lors de la mise à jour du bénéficiaire', 'error');
            this.isLoading = false;
          }
        });
      } else {
        // Add new benificiaire
        this.benificiaireService.createBenificiaire(benificiaireData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadBenificiaires();
            this.cancelForm();
            this.showMessage('Bénéficiaire ajouté avec succès', 'success');
          },
          error: (error) => {
            console.error('Error creating benificiaire:', error);
            this.showMessage('Erreur lors de l\'ajout du bénéficiaire', 'error');
            this.isLoading = false;
          }
        });
      }
    } else {
      this.showMessage('Veuillez remplir tous les champs obligatoires correctement', 'error');
    }
  }

  cancelForm() {
    this.isFormVisible = false;
    this.isEditing = false;
    this.editingBenificiaireId = null;
    this.benificiaireForm.reset();
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
