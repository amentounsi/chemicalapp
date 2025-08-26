import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande, DemandeService } from '../services/demande.service';
import { Produit, ProduitService } from '../services/produit.service';
import { Benificiaire, BenificiaireService } from '../services/benificiaire.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  demandes: Demande[] = [];
  produits: Produit[] = [];
  benificiaires: Benificiaire[] = [];
  demandeForm: FormGroup;
  isFormVisible = false;
  isEditing = false;
  editingDemandeId: number | null = null;
  isLoading = false;
  message = '';
  messageType = '';
  statutOptions = [
    { value: 'EN_ATTENTE', label: 'En attente' },
    { value: 'APPROUVEE', label: 'Approuvée' },
    { value: 'REJETEE', label: 'Rejetée' },
    { value: 'LIVREE', label: 'Livrée' }
  ];

  constructor(
    private demandeService: DemandeService,
    private produitService: ProduitService,
    private benificiaireService: BenificiaireService,
    private fb: FormBuilder
  ) {
    this.demandeForm = this.fb.group({
      quantite: ['', [Validators.required, Validators.min(1)]],
      motif: ['', [Validators.required, Validators.minLength(10)]],
      commentaire: [''],
      dateLivraisonSouhaitee: ['', Validators.required],
      produit: ['', Validators.required],
      benificiaire: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDemandes();
    this.loadProduits();
    this.loadBenificiaires();
  }

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  loadDemandes() {
    this.isLoading = true;
    this.demandeService.getDemandes().subscribe({
      next: (data) => {
        this.demandes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading demandes:', error);
        this.showMessage('Erreur lors du chargement des demandes', 'error');
        this.isLoading = false;
      }
    });
  }

  loadProduits() {
    this.produitService.getProducts().subscribe({
      next: (data) => {
        this.produits = data;
        console.log('Produits loaded:', this.produits);
      },
      error: (error) => {
        console.error('Error loading produits:', error);
        this.showMessage('Erreur lors du chargement des produits', 'error');
      }
    });
  }

  loadBenificiaires() {
    this.benificiaireService.getBenificiaires().subscribe({
      next: (data) => {
        this.benificiaires = data;
        console.log('Benificiaires loaded:', this.benificiaires);
      },
      error: (error) => {
        console.error('Error loading benificiaires:', error);
        this.showMessage('Erreur lors du chargement des bénéficiaires', 'error');
      }
    });
  }

  addDemande() {
    this.isFormVisible = true;
    this.isEditing = false;
    this.editingDemandeId = null;
    this.demandeForm.reset();
    this.clearMessage();
  }

  editDemande(demande: Demande) {
    if (demande.id == null) {
      return;
    }
    this.isFormVisible = true;
    this.isEditing = true;
    this.editingDemandeId = demande.id;
    this.demandeForm.patchValue({
      quantite: demande.quantite,
      motif: demande.motif,
      commentaire: demande.commentaire || '',
      dateLivraisonSouhaitee: demande.dateLivraisonSouhaitee,
      produit: demande.produit.id,
      benificiaire: demande.benificiaire.id
    });
    this.clearMessage();
  }

  deleteDemande(id?: number) {
    if (id == null) {
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      this.isLoading = true;
      this.demandeService.deleteDemande(id).subscribe({
        next: () => {
          this.loadDemandes();
          this.showMessage('Demande supprimée avec succès', 'success');
        },
        error: (error) => {
          console.error('Error deleting demande:', error);
          this.showMessage('Erreur lors de la suppression de la demande', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.demandeForm.valid) {
      this.isLoading = true;
      const formData = this.demandeForm.value;
      
      console.log('Form Data:', formData);
      console.log('Available Produits:', this.produits);
      console.log('Available Benificiaires:', this.benificiaires);
      
      // Find selected produit and benificiaire
      const selectedProduit = this.produits.find(p => p.id === Number(formData.produit));
      const selectedBenificiaire = this.benificiaires.find(b => b.id === Number(formData.benificiaire));
      
      console.log('Selected Produit ID:', formData.produit);
      console.log('Selected Produit:', selectedProduit);
      console.log('Selected Benificiaire ID:', formData.benificiaire);
      console.log('Selected Benificiaire:', selectedBenificiaire);
      
      if (!selectedProduit || !selectedBenificiaire) {
        this.showMessage('Produit ou bénéficiaire non trouvé', 'error');
        this.isLoading = false;
        return;
      }

      const demandeData: Demande = {
        quantite: formData.quantite,
        motif: formData.motif,
        commentaire: formData.commentaire,
        dateLivraisonSouhaitee: formData.dateLivraisonSouhaitee,
        produit: selectedProduit,
        benificiaire: selectedBenificiaire
      };
      
      if (this.isEditing && this.editingDemandeId) {
        // Update existing demande
        this.demandeService.updateDemande(this.editingDemandeId, demandeData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadDemandes();
            this.cancelForm();
            this.showMessage('Demande mise à jour avec succès', 'success');
          },
          error: (error) => {
            console.error('Error updating demande:', error);
            this.showMessage('Erreur lors de la mise à jour de la demande', 'error');
            this.isLoading = false;
          }
        });
      } else {
        // Add new demande
        this.demandeService.createDemande(demandeData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadDemandes();
            this.cancelForm();
            this.showMessage('Demande créée avec succès', 'success');
          },
          error: (error) => {
            console.error('Error creating demande:', error);
            this.showMessage('Erreur lors de la création de la demande', 'error');
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
    this.editingDemandeId = null;
    this.demandeForm.reset();
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

  changeStatut(demande: Demande, newStatut: string) {
    if (!demande.id || !newStatut) { return; }
    this.isLoading = true;
    this.demandeService.updateDemandeStatus(demande.id, newStatut).subscribe({
      next: (updated) => {
        demande.statut = updated.statut;
        this.isLoading = false;
        this.showMessage('Statut mis à jour', 'success');
      },
      error: (err) => {
        console.error('Error updating status:', err);
        this.isLoading = false;
        this.showMessage("Erreur lors de la mise à jour du statut", 'error');
      }
    });
  }

  getStatusBadgeClass(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'badge-warning';
      case 'APPROUVEE': return 'badge-success';
      case 'REJETEE': return 'badge-danger';
      case 'LIVREE': return 'badge-info';
      default: return 'badge-secondary';
    }
  }

  getStatusLabel(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'En attente';
      case 'APPROUVEE': return 'Approuvée';
      case 'REJETEE': return 'Rejetée';
      case 'LIVREE': return 'Livrée';
      default: return statut;
    }
  }
}
