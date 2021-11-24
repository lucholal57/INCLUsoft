import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionTallerComponent } from './produccion-taller.component';

describe('ProduccionTallerComponent', () => {
  let component: ProduccionTallerComponent;
  let fixture: ComponentFixture<ProduccionTallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduccionTallerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
