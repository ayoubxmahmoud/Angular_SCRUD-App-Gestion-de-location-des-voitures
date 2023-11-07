import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationVoitureComponent } from './location-voiture.component';

describe('LocationVoitureComponent', () => {
  let component: LocationVoitureComponent;
  let fixture: ComponentFixture<LocationVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationVoitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
