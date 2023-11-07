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
  selector: 'app-location-voiture', // Changed selector name
  templateUrl: './location-voiture.component.html', // Changed component file name
  styleUrls: ['./location-voiture.component.css'], // Changed component CSS file name
})
export class LocationVoitureComponent implements OnInit {
  searchQuery: string = '';

  locationVoiture = { // Changed object name
    $key: '',
    date_debut: '',
    date_fin: '',
    reference: '',
    heure_debut: '',
    heure_fin: '',
    kilometrage_debut: '',
    kilometrage_fin: '',
    distance: ''
  }
  
  itemLocation : AngularFireList<any>
  LocationArray:any[] = []
  constructor(private db: AngularFireDatabase, public router: Router,private actRoute: ActivatedRoute ) {
    this.itemLocation = db.list('locationVoiture') // Changed database reference name
     // return list of locationVoiture
     this.itemLocation.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let a:any = action.payload.toJSON()
        a['$key'] = action.key
        this.LocationArray.push(a as LocationVoiture); // Changed object type
      })
      //console.log(this.LocationArray);
    })//end
   
  }

  //The "ngOnInit" method is a lifecycle hook that is called after the component has been initialized.
  filterItems() {
    if (this.searchQuery.trim() !== '') {
      this.LocationArray = this.LocationArray.filter(item => {
        const searchTerm = this.searchQuery.toLowerCase();
        return (
          item.$key.toLowerCase().includes(searchTerm) ||
          item.date_debut.toLowerCase().includes(searchTerm) ||
          item.date_fin.toLowerCase().includes(searchTerm) ||
          item.heure_debut.toString().toLowerCase().includes(searchTerm) ||
          item.heure_fin.toString().toLowerCase().includes(searchTerm) ||
          item.kilometrage_debut.toString().toLowerCase().includes(searchTerm) ||
          item.kilometrage_fin.toString().toLowerCase().includes(searchTerm) ||
          item.distance.toString().toLowerCase().includes(searchTerm)
        );
      });
    } else {
      this.itemLocation.snapshotChanges().subscribe(actions => {
        this.LocationArray = actions.map(action => {
          const item: LocationVoiture = action.payload.toJSON() as LocationVoiture; // Changed object type
          item.$key = action.key ?? '';
          return item;
        });
      });
    }
  }

  ngOnInit(): void {
  }

  //populate the "locationVoiture" object with the corresponding 'location' details.
  EditForm($key: any){
    for( let value of this.LocationArray){
      if(value['$key'] == $key ){
        this.locationVoiture.$key = $key;
        this.locationVoiture.date_debut = value['date_debut'];
        this.locationVoiture.date_fin = value['date_fin'];
        this.locationVoiture.reference = value['reference'];
        this.locationVoiture.heure_debut = value['heure_debut'];
        this.locationVoiture.heure_fin = value['heure_fin'];
        this.locationVoiture.kilometrage_debut = value['kilometrage_debut'];
        this.locationVoiture.kilometrage_fin = value['kilometrage_fin'];
        this.locationVoiture.distance = value['distance'];
      }
    }
  }

  //updates the database with the new location
  OnEdit($key : any){
    this.locationVoiture.date_debut
    this.locationVoiture.date_fin
    this.locationVoiture.reference
    this.locationVoiture.heure_debut
    this.locationVoiture.heure_fin
    this.locationVoiture.kilometrage_debut
    this.locationVoiture.kilometrage_fin
    this.locationVoiture.distance

    this.itemLocation.set($key,{
      date_debut: this.locationVoiture.date_debut,
      date_fin: this.locationVoiture.date_fin,
      reference: this.locationVoiture.reference,
      heure_debut: this.locationVoiture.heure_debut,
      heure_fin: this.locationVoiture.heure_fin,
      kilometrage_debut: this.locationVoiture.kilometrage_debut,
      kilometrage_fin: this.locationVoiture.kilometrage_fin,
      distance: this.locationVoiture.distance,
    });
    this.LocationArray = [];
  }

  //The "onDelete" method deletes a locationVoiture from the database when the user confirms the deletion.
  onDelete($key: any){
    if (window.confirm('Are sure you want to delete this reservation?')){
      this.itemLocation.remove($key);
    }
    this.LocationArray = [];
  }
}

export interface LocationVoiture{ // Changed object type
  $key: string ;
  date_debut: string ;
  date_fin: string ;
  reference: string ;
  heure_debut: String;
  heure_fin: String;
  kilometrage_debut: String;
  kilometrage_fin: String;
  distance: String;
}
