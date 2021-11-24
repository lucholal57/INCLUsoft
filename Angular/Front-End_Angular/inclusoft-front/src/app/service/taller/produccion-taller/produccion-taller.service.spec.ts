import { TestBed } from '@angular/core/testing';

import { ProduccionTallerService } from './produccion-taller.service';

describe('ProduccionTallerService', () => {
  let service: ProduccionTallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduccionTallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
