import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenificiairesComponent } from './benificiaires/benificiaires.component';
import { ProduitComponent } from './produit/produit.component';
import { MainComponent } from './main/main.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { CommandeComponent } from './commande/commande.component';
import { DemandeComponent } from './demande/demande.component';
import { DashboardEmployeComponent } from './dashboard-employe/dashboard-employe.component';

const routes: Routes = [
  { path: 'benificiaires', component: BenificiairesComponent },
  { path: 'produit', component: ProduitComponent },
  { path: 'fournisseurs', component: FournisseursComponent },
  { path: 'commande', component: CommandeComponent },
  { path: 'demande', component: DemandeComponent },
  { path: 'dashboard-employe', component: DashboardEmployeComponent },
  { path: 'main', component: MainComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
