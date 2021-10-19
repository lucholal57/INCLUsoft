import { TestBed } from '@angular/core/testing';

import { ActaCompromisoService } from './acta-compromiso.service';

describe('ActaCompromisoService', () => {
  let service: ActaCompromisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActaCompromisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
