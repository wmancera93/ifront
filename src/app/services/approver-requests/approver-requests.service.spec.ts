import { TestBed, inject } from '@angular/core/testing';

import { ApproverRequestsService } from './approver-requests.service';

describe('ApproverRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproverRequestsService]
    });
  });

  it('should be created', inject([ApproverRequestsService], (service: ApproverRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
