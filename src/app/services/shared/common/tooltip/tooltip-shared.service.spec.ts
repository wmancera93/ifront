import { TestBed, inject } from '@angular/core/testing';

import { TooltipSharedService } from './tooltip-shared.service';

describe('TooltipSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TooltipSharedService]
    });
  });

  it('should be created', inject([TooltipSharedService], (service: TooltipSharedService) => {
    expect(service).toBeTruthy();
  }));
});
