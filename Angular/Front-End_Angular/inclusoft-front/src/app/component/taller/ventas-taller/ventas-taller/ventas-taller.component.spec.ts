import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasTallerComponent } from './ventas-taller.component';

describe('VentasTallerComponent', () => {
  let component: VentasTallerComponent;
  let fixture: ComponentFixture<VentasTallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasTallerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
