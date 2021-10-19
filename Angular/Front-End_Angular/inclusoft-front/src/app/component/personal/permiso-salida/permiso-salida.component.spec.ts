import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoSalidaComponent } from './permiso-salida.component';

describe('PermisoSalidaComponent', () => {
  let component: PermisoSalidaComponent;
  let fixture: ComponentFixture<PermisoSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisoSalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
