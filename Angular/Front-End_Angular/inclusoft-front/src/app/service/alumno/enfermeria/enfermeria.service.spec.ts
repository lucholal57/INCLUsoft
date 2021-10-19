import { TestBed } from '@angular/core/testing';

import { EnfermeriaService } from './enfermeria.service';

describe('EnfermeriaService', () => {
  let service: EnfermeriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnfermeriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
