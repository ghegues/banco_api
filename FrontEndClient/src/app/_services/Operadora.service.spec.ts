/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OperadoraService } from './Operadora.service';

describe('Service: Operadora', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperadoraService]
    });
  });

  it('should ...', inject([OperadoraService], (service: OperadoraService) => {
    expect(service).toBeTruthy();
  }));
});
