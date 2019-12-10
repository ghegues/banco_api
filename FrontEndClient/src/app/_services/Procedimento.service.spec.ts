/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcedimentoService } from './Procedimento.service';

describe('Service: Procedimento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcedimentoService]
    });
  });

  it('should ...', inject([ProcedimentoService], (service: ProcedimentoService) => {
    expect(service).toBeTruthy();
  }));
});
