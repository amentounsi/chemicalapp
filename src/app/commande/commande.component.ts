import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commande, CommandeService } from '../services/commande.service';
import { Produit, ProduitService } from '../services/produit.service';
import { Fournisseur, FournisseurService } from '../services/fournisseur.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  commandes: Commande[] = [];
  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];
  commandeForm: FormGroup;
  isFormVisible = false;
  isEditing = false;
  editingCommandeId: number | null = null;
  isLoading = false;
  message = '';
  messageType = '';
  statutOptions = [
    { value: 'EN_ATTENTE', label: 'En attente' },
    { value: 'CONFIRMEE', label: 'Confirmée' },
    { value: 'LIVREE', label: 'Livrée' },
    { value: 'ANNULEE', label: 'Annulée' }
  ];

  constructor(
    private commandeService: CommandeService,
    private produitService: ProduitService,
    private fournisseurService: FournisseurService,
    private fb: FormBuilder
  ) {
    this.commandeForm = this.fb.group({
      quantite: ['', [Validators.required, Validators.min(1)]],
      prixUnitaire: ['', [Validators.required, Validators.min(0)]],
      commentaire: [''],
      produit: ['', Validators.required],
      fournisseur: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCommandes();
    this.loadProduits();
    this.loadFournisseurs();
  }

  loadCommandes() {
    this.isLoading = true;
    this.commandeService.getCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading commandes:', error);
        this.showMessage('Erreur lors du chargement des commandes', 'error');
        this.isLoading = false;
      }
    });
  }

  loadProduits() {
    this.produitService.getProducts().subscribe({
      next: (data) => {
        this.produits = data;
        console.log('Commande Produits loaded:', this.produits);
      },
      error: (error) => {
        console.error('Error loading produits:', error);
        this.showMessage('Erreur lors du chargement des produits', 'error');
      }
    });
  }

  loadFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data;
        console.log('Commande Fournisseurs loaded:', this.fournisseurs);
      },
      error: (error) => {
        console.error('Error loading fournisseurs:', error);
        this.showMessage('Erreur lors du chargement des fournisseurs', 'error');
      }
    });
  }

  addCommande() {
    this.isFormVisible = true;
    this.isEditing = false;
    this.editingCommandeId = null;
    this.commandeForm.reset();
    this.clearMessage();
  }

  editCommande(commande: Commande) {
    if (commande.id == null) {
      return;
    }
    this.isFormVisible = true;
    this.isEditing = true;
    this.editingCommandeId = commande.id;
    this.commandeForm.patchValue({
      quantite: commande.quantite,
      prixUnitaire: commande.prixUnitaire,
      commentaire: commande.commentaire || '',
      produit: commande.produit.id,
      fournisseur: commande.fournisseur.id
    });
    this.clearMessage();
  }

  deleteCommande(id?: number) {
    if (id == null) {
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.isLoading = true;
      this.commandeService.deleteCommande(id).subscribe({
        next: () => {
          this.loadCommandes();
          this.showMessage('Commande supprimée avec succès', 'success');
        },
        error: (error) => {
          console.error('Error deleting commande:', error);
          this.showMessage('Erreur lors de la suppression de la commande', 'error');
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.commandeForm.valid) {
      this.isLoading = true;
      const formData = this.commandeForm.value;
      
      console.log('Commande Form Data:', formData);
      console.log('Available Produits:', this.produits);
      console.log('Available Fournisseurs:', this.fournisseurs);
      
      // Find selected produit and fournisseur
      const selectedProduit = this.produits.find(p => p.id === Number(formData.produit));
      const selectedFournisseur = this.fournisseurs.find(f => f.id === Number(formData.fournisseur));
      
      console.log('Selected Produit ID:', formData.produit);
      console.log('Selected Produit:', selectedProduit);
      console.log('Selected Fournisseur ID:', formData.fournisseur);
      console.log('Selected Fournisseur:', selectedFournisseur);
      
      if (!selectedProduit || !selectedFournisseur) {
        this.showMessage('Produit ou fournisseur non trouvé', 'error');
        this.isLoading = false;
        return;
      }

      const commandeData: Commande = {
        quantite: formData.quantite,
        prixUnitaire: formData.prixUnitaire,
        commentaire: formData.commentaire,
        produit: selectedProduit,
        fournisseur: selectedFournisseur
      };
      
      if (this.isEditing && this.editingCommandeId) {
        // Update existing commande
        this.commandeService.updateCommande(this.editingCommandeId, commandeData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadCommandes();
            this.cancelForm();
            this.showMessage('Commande mise à jour avec succès', 'success');
          },
          error: (error) => {
            console.error('Error updating commande:', error);
            this.showMessage('Erreur lors de la mise à jour de la commande', 'error');
            this.isLoading = false;
          }
        });
      } else {
        // Add new commande
        this.commandeService.createCommande(commandeData).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.loadCommandes();
            this.cancelForm();
            this.showMessage('Commande créée avec succès', 'success');
          },
          error: (error) => {
            console.error('Error creating commande:', error);
            this.showMessage('Erreur lors de la création de la commande', 'error');
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
    this.editingCommandeId = null;
    this.commandeForm.reset();
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

  changeStatut(commande: Commande, newStatut: string) {
    if (!commande.id || !newStatut) { return; }
    this.isLoading = true;
    this.commandeService.updateCommandeStatus(commande.id, newStatut).subscribe({
      next: (updated) => {
        commande.statut = updated.statut;
        this.isLoading = false;
        this.showMessage('Statut de la commande mis à jour', 'success');
      },
      error: (err) => {
        console.error('Error updating commande status:', err);
        this.isLoading = false;
        this.showMessage("Erreur lors de la mise à jour du statut de la commande", 'error');
      }
    });
  }

  getStatusBadgeClass(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'badge-warning';
      case 'CONFIRMEE': return 'badge-info';
      case 'LIVREE': return 'badge-success';
      case 'ANNULEE': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  getStatusLabel(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'En attente';
      case 'CONFIRMEE': return 'Confirmée';
      case 'LIVREE': return 'Livrée';
      case 'ANNULEE': return 'Annulée';
      default: return statut;
    }
  }
}
