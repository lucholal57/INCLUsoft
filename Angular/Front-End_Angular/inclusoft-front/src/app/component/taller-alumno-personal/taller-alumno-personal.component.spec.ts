import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerAlumnoPersonalComponent } from './taller-alumno-personal.component';

describe('TallerAlumnoPersonalComponent', () => {
  let component: TallerAlumnoPersonalComponent;
  let fixture: ComponentFixture<TallerAlumnoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TallerAlumnoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerAlumnoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
