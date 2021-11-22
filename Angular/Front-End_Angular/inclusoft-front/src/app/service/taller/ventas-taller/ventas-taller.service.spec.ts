import { TestBed } from '@angular/core/testing';

import { VentasTallerService } from './ventas-taller.service';

describe('VentasTallerService', () => {
  let service: VentasTallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasTallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
