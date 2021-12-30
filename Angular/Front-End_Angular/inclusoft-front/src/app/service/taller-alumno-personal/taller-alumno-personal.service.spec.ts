import { TestBed } from '@angular/core/testing';

import { TallerAlumnoPersonalService } from './taller-alumno-personal.service';

describe('TallerAlumnoPersonalService', () => {
  let service: TallerAlumnoPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TallerAlumnoPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
