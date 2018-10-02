import { TestBed, inject } from '@angular/core/testing';

import { TravelApproverService } from './travel-approver.service';

describe('TravelApproverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelApproverService]
    });
  });

  it('should be created', inject([TravelApproverService], (service: TravelApproverService) => {
    expect(service).toBeTruthy();
  }));
});
