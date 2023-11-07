import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css']
})
export class LocationInfoComponent implements OnInit {

  facture = {
    $key: '',
    date_fact:'',
    sous_total: '',
    forfait: '',
    paiement: ''
  }
  paiement = {
    method: '',
  }
  paiement_cheque = {
    $key: '',
    method: 'cheque',
    reference: '',
    numero: '',
  }
  paiement_carte = {
    $key: '',
    reference: '',
    method: 'carte',
    numero: '',
    date_expiration: '',
  }
  garage = {
      $key:'',
      nom: '',
      adresse:''
  }
  

  itemFacture : AngularFireList<any>
  itemGarage: AngularFireList<any>
  itemPaiement: AngularFireList<any>

  id:any
  factureArray: any[] = []
  garageArray: any[] = []
  paiementArray: any[] = []


  constructor(private db: AngularFireDatabase, public router: Router, private actRoute: ActivatedRoute) { 
    this.itemFacture = db.list('facture');
    this.itemGarage = db.list('garage');
    this.itemPaiement = db.list('paiement');
    this.id = this.actRoute.snapshot.paramMap.get('$locationKey');

    //return data facture
    this.itemFacture.snapshotChanges().subscribe(actions=>{
      actions.forEach(action =>{
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.factureArray.push(a as Facture)
      })
    })
    //return data garage
    this.itemGarage.snapshotChanges().subscribe(actions=>{
      actions.forEach(action =>{
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.garageArray.push(a as Garage)
      })
    })
    //return data paiement
    this.itemPaiement.snapshotChanges().subscribe(actions=>{
      actions.forEach(action =>{
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        if (a.method === 'cheque'){
          this.paiementArray.push(a as Paiement_CHEQUE);

        }else{
          this.paiementArray.push(a as Paiement_CARTE);
        }
      })
    })


  }

  ngOnInit(): void {
  }
  
  

}

export interface Facture{
  $key: String;
  reference: String;
  date_fact: String;
  sous_total: String;
  forfait: String;
}

export interface Garage{
  $key:String;
  reference: String;
  nom: String;
  adresse: String;
}
export interface Paiement_CARTE{
  $key:String;
  numero: String;
  method: String;
  date_expiration: String;
}
export interface Paiement_CHEQUE{
  $key:String;
  numero: String;
  method: String;
}

