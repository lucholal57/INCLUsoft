import { TestBed } from '@angular/core/testing';

import { EvaluacionLaboralService } from './evaluacion-laboral.service';

describe('EvaluacionLaboralService', () => {
  let service: EvaluacionLaboralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacionLaboralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
