import { TestBed } from '@angular/core/testing';

import { CooperadoraService } from './cooperadora.service';

describe('CooperadoraService', () => {
  let service: CooperadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CooperadoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
