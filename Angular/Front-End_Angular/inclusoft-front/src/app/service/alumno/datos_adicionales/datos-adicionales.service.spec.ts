import { TestBed } from '@angular/core/testing';

import { DatosAdicionalesService } from './datos-adicionales.service';

describe('DatosAdicionalesService', () => {
  let service: DatosAdicionalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosAdicionalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
