import { TestBed, inject } from '@angular/core/testing';

import { BackofficeService } from './backoffice.service';

describe('BackofficeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackofficeService]
    });
  });

  it('should be created', inject([BackofficeService], (service: BackofficeService) => {
    expect(service).toBeTruthy();
  }));
});
