import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesTallerComponent } from './materiales-taller.component';

describe('MaterialesTallerComponent', () => {
  let component: MaterialesTallerComponent;
  let fixture: ComponentFixture<MaterialesTallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesTallerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
