import { TestBed } from '@angular/core/testing';

import { CompraTallerService } from './compra-taller.service';

describe('CompraTallerService', () => {
  let service: CompraTallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraTallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
