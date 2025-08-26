import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProduitComponent } from './produit/produit.component';
import { BenificiairesComponent } from './benificiaires/benificiaires.component';
import { MainComponent } from './main/main.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { RevealOnScrollDirective } from './shared/reveal-on-scroll.directive';
import { CommandeComponent } from './commande/commande.component';
import { DemandeComponent } from './demande/demande.component';
import { DashboardEmployeComponent } from './dashboard-employe/dashboard-employe.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ProduitComponent,
    BenificiairesComponent,
    MainComponent,
    FournisseursComponent,
    RevealOnScrollDirective,
    CommandeComponent,
    DemandeComponent,
    DashboardEmployeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
