import { TestBed, inject } from '@angular/core/testing';

import { EvaluationsSharedService } from './evaluations-shared.service';

describe('EvaluationsSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluationsSharedService]
    });
  });

  it('should be created', inject([EvaluationsSharedService], (service: EvaluationsSharedService) => {
    expect(service).toBeTruthy();
  }));
});
