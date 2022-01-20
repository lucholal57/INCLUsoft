import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesCuatrimestralesComponent } from './informes-cuatrimestrales.component';

describe('InformesCuatrimestralesComponent', () => {
  let component: InformesCuatrimestralesComponent;
  let fixture: ComponentFixture<InformesCuatrimestralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformesCuatrimestralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesCuatrimestralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
