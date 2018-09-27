import { TestBed, inject } from '@angular/core/testing';

import { ApproverTravelsService } from './approver-travels.service';

describe('ApproverTravelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproverTravelsService]
    });
  });

  it('should be created', inject([ApproverTravelsService], (service: ApproverTravelsService) => {
    expect(service).toBeTruthy();
  }));
});
