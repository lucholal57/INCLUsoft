import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioTallerComponent } from './inventario-taller.component';

describe('InventarioTallerComponent', () => {
  let component: InventarioTallerComponent;
  let fixture: ComponentFixture<InventarioTallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioTallerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
