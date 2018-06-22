import { TestBed, inject } from '@angular/core/testing';

import { LizethService } from './lizeth.service';

describe('LizethService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LizethService]
    });
  });

  it('should be created', inject([LizethService], (service: LizethService) => {
    expect(service).toBeTruthy();
  }));
});
