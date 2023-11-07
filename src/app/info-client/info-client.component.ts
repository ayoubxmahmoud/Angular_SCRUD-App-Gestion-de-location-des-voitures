import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.css']
})
export class InfoClientComponent implements OnInit {
  data = { 
    $key: '',
    name: '' ,
    prenom: '' ,
    address: '' ,
    phone: ''
   }
   voiture = { 
     $key:'',
     type:'',
     marque:'',
     modele:'',
     puissance:''
    }
    locationVoiture = {
     $key: '',
     date_debut: '',
     date_fin: '',
     heure_debut: '',
     heure_fin: '',
     kilometrage_debut: '',
     kilometrage_fin: '',
   }
   
 
   
   itemList : AngularFireList<any>
   itemVoiture : AngularFireList<any>
   itemLocation : AngularFireList<any>
 
   itemArray: any[] = []
   voitureArray: any[] = []
   LocationArray: any[] = []
   id: any 
   
   constructor(private db: AngularFireDatabase, public router: Router, private actRoute: ActivatedRoute) {
     this.itemList = db.list('client')
     this.itemVoiture = db.list('voiture')
     this.itemLocation = db.list('locationVoiture')
 
     // return data client
     this.itemList.snapshotChanges().subscribe(actions => {
       actions.forEach(action => {
         let a: any = action.payload.toJSON()
         a['$key'] = action.key
         this.itemArray.push(a as ListItemClass);
       })
     })//end
      // return data voiture
      this.itemVoiture.snapshotChanges().subscribe(actions => {
       actions.forEach(action => {
         let a: any = action.payload.toJSON()
         a['$key'] = action.key
         this.voitureArray.push(a as ListVoitureClass);
       })
       //console.log(this.voitureArray);
     })//end
     // return data locationVoiture
     this.itemLocation.snapshotChanges().subscribe(actions => {
       actions.forEach(action => {
         let a: any = action.payload.toJSON()
         a['$key'] = action.key
         this.LocationArray.push(a as LocationVoiture);
       })
       //console.log(this.locationArray);
     })//end
 
     this.id = this.actRoute.snapshot.paramMap.get('$key');
   }
 
   ngOnInit() {
   }
   
   insertVoiture() {
     this.itemVoiture.push({
       reference: this.id,
       type: this.voiture.type,
       marque: this.voiture.marque,
       modele: this.voiture.modele,
       puissance: this.voiture.puissance
     });
      // Clear the voiture object
      this.voiture = {
        $key: '',
        type: '',
        marque: '',
        modele: '',
        puissance: ''
      };
     this.voitureArray = [];
   }
   
   insertLocation() {
     if (this.locationVoiture.kilometrage_fin > this.locationVoiture.kilometrage_debut) {
       const kilometrageDebut = Number(this.locationVoiture.kilometrage_debut);
       const kilometrageFin = Number(this.locationVoiture.kilometrage_fin);
       const distance = kilometrageFin - kilometrageDebut;
   
       this.itemLocation.push({
         reference: this.id,
         date_debut: this.locationVoiture.date_debut,
         date_fin: this.locationVoiture.date_fin,
         heure_debut: this.locationVoiture.heure_debut,
         heure_fin: this.locationVoiture.heure_fin,
         kilometrage_debut: kilometrageDebut,
         kilometrage_fin: kilometrageFin,
         distance: distance,
       });
       this.locationVoiture = {
        $key: '',
        date_debut: '',
        date_fin: '',
        heure_debut: '',
        heure_fin: '',
        kilometrage_debut: '',
        kilometrage_fin: '',
      }
       this.LocationArray = [];
      }
   }
}
export interface ListItemClass {
  $key: String ;
  name: String  ;
  prenom: String ;
  address: String ;
  phone: String ;
}
export interface ListVoitureClass {
  $key: String ;
  reference: String;
  type: String  ;
  marque: String ;
  modele: String ;
  puissance: String ;
}
export interface LocationVoiture {
  $key: String ;
  date_debut: String ;
  date_fin: String ;
  reference: String ;
  heure_debut: String;
  heure_fin: String;
  kilometrage_debut: String;
  kilometrage_fin: String;
  distance: String;
}
