/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParametrizacaoProcedimentosService } from './parametrizacao-procedimentos.service';

describe('Service: ParametrizacaoProcedimentos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametrizacaoProcedimentosService]
    });
  });

  it('should ...', inject([ParametrizacaoProcedimentosService], (service: ParametrizacaoProcedimentosService) => {
    expect(service).toBeTruthy();
  }));
});
