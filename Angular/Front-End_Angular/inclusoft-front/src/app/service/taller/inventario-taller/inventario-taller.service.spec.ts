import { TestBed } from '@angular/core/testing';

import { InventarioTallerService } from './inventario-taller.service';

describe('InventarioTallerService', () => {
  let service: InventarioTallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioTallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
