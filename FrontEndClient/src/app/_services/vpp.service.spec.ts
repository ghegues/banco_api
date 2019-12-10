/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VppService } from './vpp.service';

describe('Service: Vpp.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VppService]
    });
  });

  it('should ...', inject([VppService], (service: VppService) => {
    expect(service).toBeTruthy();
  }));
});
