import { TestBed, inject } from '@angular/core/testing';

import { AproversRequestsService } from './aprovers-requests.service';

describe('AproversRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AproversRequestsService]
    });
  });

  it('should be created', inject([AproversRequestsService], (service: AproversRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
