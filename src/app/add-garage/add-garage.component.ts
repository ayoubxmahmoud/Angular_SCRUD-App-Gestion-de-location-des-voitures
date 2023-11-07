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
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.css']
})
export class AddGarageComponent implements OnInit {

  garage = {
    $key: '',
    nom: '',
    adresse: '',
  }
  itemGarage: AngularFireList<any>;
  id:any;

  constructor(private db: AngularFireDatabase, public router: Router, private actRoute: ActivatedRoute){
    this.itemGarage = db.list('garage')
    this.id = this.actRoute.snapshot.paramMap.get('$garageKey');
  }
  addGarage(){
    this.itemGarage.push({
      nom: this.garage.nom,
      adresse: this.garage.adresse,
      reference: this.id
    })
    this.router.navigate(['/locationinfo',this.id]);

  }

  ngOnInit(): void {
  }


}
