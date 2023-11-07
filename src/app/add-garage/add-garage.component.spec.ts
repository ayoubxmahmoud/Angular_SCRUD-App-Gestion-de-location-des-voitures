import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGarageComponent } from './add-garage.component';

describe('AddGarageComponent', () => {
  let component: AddGarageComponent;
  let fixture: ComponentFixture<AddGarageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGarageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
