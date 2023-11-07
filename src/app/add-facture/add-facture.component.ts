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
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.css']
})
export class AddFactureComponent implements OnInit {

  facture = {
    $key: '',
    reference: '',
    date_fact: '',
    sous_total: '',
    forfait: '',
  };
  paiement = {
    method: 'none',
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



  itemFacture: AngularFireList<any>;
  itemPaiement: AngularFireList<any>;

  id: any;
  factureArray: any[] = [];
  paimentArray: any[] = [];
  showNumeroField = false;
  showExpirationField = false;

  handlePaymentMethodChange() {
    const paymentMethod = this.paiement.method;
  
    this.showNumeroField = paymentMethod === 'cheque';
    this.showExpirationField = paymentMethod === 'carte';
  
    if (paymentMethod !== 'none'){
      if (paymentMethod === 'carte') {
        this.showNumeroField = true;
        this.showExpirationField = true;
      } else {
        this.showNumeroField = true;
      }      
    }

  }
  

  constructor(
    private db: AngularFireDatabase,
    public router: Router,
    private actRoute: ActivatedRoute
  ) { 
    this.itemFacture = db.list('facture');
    this.itemPaiement = db.list('paiement');
    this.id = this.actRoute.snapshot.paramMap.get('$factureKey');
  }

  ngOnInit(): void {
  }

  addFacture() {
    let sous_total:any = Number(this.facture.sous_total);
    let tva:any = Number(sous_total*0.2);
    let total:any = Number(tva + sous_total);
    this.itemFacture.push({
      reference: this.id,
      date_fact: this.facture.date_fact,
      sous_total: this.facture.sous_total,
      forfait: this.facture.forfait,
      tva: tva,
      total:total,
    });
    this.addPaiement();
    this.router.navigate(['/addgarage',this.id]);

  }
  addPaiement(){
    console.log("look : "+this.paiement.method);
    if (this.paiement.method === 'cheque'){
      this.itemPaiement.push({
        numero: this.paiement_cheque.numero,
        method: 'cheque',
        reference: this.id,
      })
    }
    if (this.paiement.method === 'carte'){
      this.itemPaiement.push({
        numero: this.paiement_carte.numero,
        method: 'carte',
        date_expiration: this.paiement_carte.date_expiration,
        reference: this.id,
      })
    }

  }


}
export interface Facture{
  $key: String;
  reference: String;
  date_fact: String;
  sous_total: String;
  forfait: String;
}
export interface Paiement_CARTE{
  $key:String;
  numero: String;
  date_expiration: String;
}
export interface Paiement_CARTE{
  $key:String;
  numero: String;
}
