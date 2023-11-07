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
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {
  searchQuery: string = '';

  voiture= { 
    $key:'',
    type:'',
    marque:'',
    modele:'',
    puissance:'',
    reference: ''
   }
   itemvoiture : AngularFireList<any>
   voitureArray:any[] = []

   constructor(private db: AngularFireDatabase, public router: Router,private actRoute: ActivatedRoute ) {
    this.itemvoiture = db.list('voiture')
     // return voiture 
     this.itemvoiture.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.voitureArray.push(a as ListvoitureClass);
      })
      //console.log(this.voitureArray);
    })//end
   
  }
  filterItems() {
    if (this.searchQuery.trim() !== '') {
      this.voitureArray = this.voitureArray.filter(item => {
        const searchTerm = this.searchQuery.toLowerCase();
        return (
          item.$key.toLowerCase().includes(searchTerm) ||
          item.type.toLowerCase().includes(searchTerm) ||
          item.marque.toLowerCase().includes(searchTerm) ||
          item.modele.toLowerCase().includes(searchTerm) ||
          item.puissance.toLowerCase().includes(searchTerm)

        );
      });
    } else {
      this.itemvoiture.snapshotChanges().subscribe(actions => {
        this.voitureArray = actions.map(action => {
          const item: ListvoitureClass = action.payload.toJSON() as ListvoitureClass;
          item.$key = action.key ?? '';
          return item;
        });
        
      });
    }
  }

  ngOnInit(): void {
  }
  EditForm($key: any){
    for( let value of this.voitureArray){
      if(value['$key'] == $key ){
        this.voiture.$key = $key;
        this.voiture.type = value['type'];
        this.voiture.marque = value['marque'] ;
        this.voiture.modele = value['modele'];
        this.voiture.puissance = value['puissance'];
        this.voiture.reference = value['reference'];
      }
    }
  }
  OnEdit($key : any){
    this.voiture.type 
    this.voiture.marque 
    this.voiture.modele
    this.voiture.puissance 
    this.voiture.reference

    this.itemvoiture.set($key,{
      type: this.voiture.type,
      marque: this.voiture.marque,
      modele: this.voiture.modele,
      puissance: this.voiture.puissance,
      reference: this.voiture.reference,
    })
    this.voitureArray = [];
  }
  onDelete($key: any){
    if (window.confirm('Are sure you want to delete this voiture?')){

      this.itemvoiture.remove($key);
    }
    this.voitureArray = []
    this.router.navigate(['/voitures']);
  }

}
export interface ListvoitureClass{
  $key: string ;
  reference: String;
  type: string  ;
  marque: string ;
  modele: string ;
  puissance: string ;
}
