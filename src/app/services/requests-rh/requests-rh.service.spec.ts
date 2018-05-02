import { TestBed, inject } from '@angular/core/testing';

import { RequestsRhService } from './requests-rh.service';

describe('RequestsRhService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestsRhService]
    });
  });

  it('should be created', inject([RequestsRhService], (service: RequestsRhService) => {
    expect(service).toBeTruthy();
  }));
});
