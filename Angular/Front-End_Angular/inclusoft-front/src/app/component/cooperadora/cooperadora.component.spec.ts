import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperadoraComponent } from './cooperadora.component';

describe('CooperadoraComponent', () => {
  let component: CooperadoraComponent;
  let fixture: ComponentFixture<CooperadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooperadoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
