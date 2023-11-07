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
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  searchQuery: string = '';

  facture = {
    $key: '',
    reference: '',
    date_fact: '',
    sous_total: '',
    forfait: '',
  };
  itemFacture: AngularFireList<any>;
  factureArray: any[] = [];
  
  constructor(private db: AngularFireDatabase,public router: Router,private actRoute: ActivatedRoute) { 
    this.itemFacture = db.list('facture');

    // return vehicule vehicule
     this.itemFacture.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.factureArray.push(a as Facture);
      })
      //console.log(this.vehiculeArray);
    })//end
  }
  filterItems() {
    if (this.searchQuery.trim() !== '') {
      this.factureArray = this.factureArray.filter(item => {
        const searchTerm = this.searchQuery.toLowerCase();
        return (
          item.$key.toLowerCase().includes(searchTerm) ||
          item.date_fact.toLowerCase().includes(searchTerm) ||
          item.sous_total.toLowerCase().includes(searchTerm) ||
          item.forfait.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      this.itemFacture.snapshotChanges().subscribe(actions => {
        this.factureArray = actions.map(action => {
          const item: Facture = action.payload.toJSON() as Facture;
          item.$key = action.key ?? '';
          return item;
        });
        
      });
    }
  }
  ngOnInit(): void {
  }
  EditForm($key:any){
    for(let value of this.factureArray){
      if(value['$key'] == $key){
        this.facture.$key = value['$key'];
        this.facture.date_fact = value['date_fact'];
        this.facture.sous_total = value['sous_total'];
        this.facture.forfait = value['forfait'];
        this.facture.reference = value['reference'];
      }
    }
  }
  OnEdit($key : any){
    let sous_total:any = Number(this.facture.sous_total);
    let tva:any = Number(sous_total*0.2);
    let total:any = Number(tva + sous_total);
    this.itemFacture.set($key,{
      reference: this.facture.reference,
      date_fact: this.facture.date_fact,
      sous_total: this.facture.sous_total,
      forfait: this.facture.forfait,
      tva: tva,
      total:total,
    });
    this.factureArray = [];
  }
  onDelete($key: any){
    if (window.confirm('Are sure you want to delete this facture?')){
      this.itemFacture.remove($key);
    }
    this.factureArray = []
    this.router.navigate(['/factures']);
  }


}
export interface Facture{
  $key: String;
  reference: String;
  date_fact: String;
  sous_total: String;
  forfait: String;
}