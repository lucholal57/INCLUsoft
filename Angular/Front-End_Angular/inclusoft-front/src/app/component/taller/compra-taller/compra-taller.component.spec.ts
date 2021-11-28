import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraTallerComponent } from './compra-taller.component';

describe('CompraTallerComponent', () => {
  let component: CompraTallerComponent;
  let fixture: ComponentFixture<CompraTallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraTallerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
