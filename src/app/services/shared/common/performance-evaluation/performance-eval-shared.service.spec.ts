import { TestBed, inject } from '@angular/core/testing';

import { PerformanceEvalSharedService } from './performance-eval-shared.service';

describe('PerformanceEvalSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformanceEvalSharedService]
    });
  });

  it('should be created', inject([PerformanceEvalSharedService], (service: PerformanceEvalSharedService) => {
    expect(service).toBeTruthy();
  }));
});
