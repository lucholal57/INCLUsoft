import { TestBed } from '@angular/core/testing';

import { EntregaProyectoService } from './entrega-proyecto.service';

describe('EntregaProyectoService', () => {
  let service: EntregaProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
