import { TestBed } from '@angular/core/testing';

import { MaterialesTallerService } from './materiales-taller.service';

describe('MaterialesTallerService', () => {
  let service: MaterialesTallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialesTallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
