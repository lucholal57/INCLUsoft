import { TestBed } from '@angular/core/testing';

import { PermisoSalidaService } from './permiso-salida.service';

describe('PermisoSalidaService', () => {
  let service: PermisoSalidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoSalidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
