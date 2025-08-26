import { Component, OnInit } from '@angular/core';

interface Commande {
  id: number;
  produit: string;
  quantite: number;
  date: string;
  statut: string;
  total: number;
  priorite: string;
}

@Component({
  selector: 'app-dashboard-employe',
  templateUrl: './dashboard-employe.component.html',
  styleUrls: ['./dashboard-employe.component.css']
})
export class DashboardEmployeComponent implements OnInit {
  employeeInfo = {
    nom: 'Ahmed Ben Salem',
    matricule: 'EMP-2024-001',
    poste: 'Technicien Laboratoire',
    departement: 'Chimie Analytique',
    email: 'ahmed.bensalem@cnstn.tn',
    telephone: '+216 71 234 567',
    dateEmbauche: '15/01/2022',
    statut: 'Actif'
  };

  commandes: Commande[] = [
    {
      id: 1,
      produit: 'Produit A - Réactif Standard',
      quantite: 5,
      date: '2024-01-15',
      statut: 'Approuvée',
      total: 500,
      priorite: 'Normale'
    },
    {
      id: 2,
      produit: 'Produit B - Solvant HPLC',
      quantite: 3,
      date: '2024-01-10',
      statut: 'En cours',
      total: 450,
      priorite: 'Haute'
    },
    {
      id: 3,
      produit: 'Produit C - Échantillon de Référence',
      quantite: 2,
      date: '2024-01-08',
      statut: 'Livrée',
      total: 400,
      priorite: 'Normale'
    },
    {
      id: 4,
      produit: 'Produit A - Réactif Standard',
      quantite: 4,
      date: '2024-01-05',
      statut: 'Livrée',
      total: 400,
      priorite: 'Basse'
    }
  ];

  stats = {
    totalCommandes: 0,
    commandesApprouvees: 0,
    commandesEnCours: 0,
    commandesLivrees: 0,
    montantTotal: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.calculateStats();
  }

  calculateStats(): void {
    this.stats.totalCommandes = this.commandes.length;
    this.stats.commandesApprouvees = this.commandes.filter(c => c.statut === 'Approuvée').length;
    this.stats.commandesEnCours = this.commandes.filter(c => c.statut === 'En cours').length;
    this.stats.commandesLivrees = this.commandes.filter(c => c.statut === 'Livrée').length;
    this.stats.montantTotal = this.commandes.reduce((sum, c) => sum + c.total, 0);
  }

  getStatusClass(statut: string): string {
    switch (statut) {
      case 'Approuvée': return 'status-approved';
      case 'En cours': return 'status-pending';
      case 'Livrée': return 'status-delivered';
      default: return 'status-default';
    }
  }

  getPriorityClass(priorite: string): string {
    switch (priorite) {
      case 'Urgente': return 'priority-urgent';
      case 'Haute': return 'priority-high';
      case 'Normale': return 'priority-normal';
      case 'Basse': return 'priority-low';
      default: return 'priority-normal';
    }
  }
}
