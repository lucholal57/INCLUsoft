import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedenteMedicoComponent } from './antecedente-medico.component';

describe('AntecedenteMedicoComponent', () => {
  let component: AntecedenteMedicoComponent;
  let fixture: ComponentFixture<AntecedenteMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedenteMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedenteMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
