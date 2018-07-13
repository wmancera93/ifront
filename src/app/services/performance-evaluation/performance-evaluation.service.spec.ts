import { TestBed, inject } from '@angular/core/testing';

import { PerformanceEvaluationService } from './performance-evaluation.service';

describe('PerformanceEvaluationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformanceEvaluationService]
    });
  });

  it('should be created', inject([PerformanceEvaluationService], (service: PerformanceEvaluationService) => {
    expect(service).toBeTruthy();
  }));
});
