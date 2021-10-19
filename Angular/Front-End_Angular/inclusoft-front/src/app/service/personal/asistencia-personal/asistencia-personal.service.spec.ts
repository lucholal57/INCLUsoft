import { TestBed } from '@angular/core/testing';

import { AsistenciaPersonalService } from './asistencia-personal.service';

describe('AsistenciaPersonalService', () => {
  let service: AsistenciaPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenciaPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
