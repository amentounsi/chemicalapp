import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenificiairesComponent } from './benificiaires/benificiaires.component';
import { ProduitComponent } from './produit/produit.component';
import { MainComponent } from './main/main.component';
import * as path from 'path';


const routes: Routes = [
  { path: 'benificiaires', component: BenificiairesComponent },
  { path: 'produit', component: ProduitComponent },
  {path: 'main', component: MainComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
