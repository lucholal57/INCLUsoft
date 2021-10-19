import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionLabolarComponent } from './evaluacion-labolar.component';

describe('EvaluacionLabolarComponent', () => {
  let component: EvaluacionLabolarComponent;
  let fixture: ComponentFixture<EvaluacionLabolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionLabolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionLabolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
