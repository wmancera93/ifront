import { TestBed, inject } from '@angular/core/testing';

import { AdvanceSharedService } from './advance-shared.service';

describe('AdvanceSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvanceSharedService]
    });
  });

  it('should be created', inject([AdvanceSharedService], (service: AdvanceSharedService) => {
    expect(service).toBeTruthy();
  }));
});
