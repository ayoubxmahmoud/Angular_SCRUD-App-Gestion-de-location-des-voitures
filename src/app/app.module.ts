import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { environment } from '../environments/environment';
import { LocationInfoComponent } from './location-info/location-info.component';
import { FactureComponent } from './facture/facture.component';
import { AddFactureComponent } from './add-facture/add-facture.component';
import { AddGarageComponent } from './add-garage/add-garage.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { InfoClientComponent } from './info-client/info-client.component';
import { ClientComponent } from './client/client.component';
import { VoitureComponent } from './voiture/voiture.component';
import { LocationVoitureComponent } from './location-voiture/location-voiture.component';


const routes: Routes = [
  // Protect the home route with the AuthGuard
  { path: '', redirectTo:'login' , pathMatch:'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'voiture', component: VoitureComponent },
  { path: 'location_voiture', component: LocationVoitureComponent },
  { path: 'info-client/:$key', component: InfoClientComponent },
  { path: 'locationinfo/:$locationKey', component: LocationInfoComponent },
  { path: 'addfacture/:$factureKey', component: AddFactureComponent },
  { path: 'addgarage/:$garageKey', component: AddGarageComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent}



];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LocationInfoComponent,
    FactureComponent,
    AddFactureComponent,
    AddGarageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    InfoClientComponent,
    ClientComponent,
    VoitureComponent,
    LocationVoitureComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
 
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }


