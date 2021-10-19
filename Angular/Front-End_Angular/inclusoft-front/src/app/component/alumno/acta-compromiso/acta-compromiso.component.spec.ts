import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaCompromisoComponent } from './acta-compromiso.component';

describe('ActaCompromisoComponent', () => {
  let component: ActaCompromisoComponent;
  let fixture: ComponentFixture<ActaCompromisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActaCompromisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActaCompromisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
