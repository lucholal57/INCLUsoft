import { TestBed } from '@angular/core/testing';

import { InformesCuatrimestralesService } from './informes-cuatrimestrales.service';

describe('InformesCuatrimestralesService', () => {
  let service: InformesCuatrimestralesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformesCuatrimestralesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
