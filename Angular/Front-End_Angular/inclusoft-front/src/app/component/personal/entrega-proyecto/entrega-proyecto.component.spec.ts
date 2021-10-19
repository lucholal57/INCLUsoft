import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaProyectoComponent } from './entrega-proyecto.component';

describe('EntregaProyectoComponent', () => {
  let component: EntregaProyectoComponent;
  let fixture: ComponentFixture<EntregaProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
