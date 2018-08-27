import { TestBed, inject } from '@angular/core/testing';

import { TrainingSharedService } from './training-shared.service';

describe('TrainingSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingSharedService]
    });
  });

  it('should be created', inject([TrainingSharedService], (service: TrainingSharedService) => {
    expect(service).toBeTruthy();
  }));
});
