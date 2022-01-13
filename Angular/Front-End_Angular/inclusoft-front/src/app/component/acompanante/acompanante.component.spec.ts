import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompananteComponent } from './acompanante.component';

describe('AcompananteComponent', () => {
  let component: AcompananteComponent;
  let fixture: ComponentFixture<AcompananteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompananteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompananteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
