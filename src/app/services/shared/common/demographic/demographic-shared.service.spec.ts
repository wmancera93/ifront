import { TestBed, inject } from '@angular/core/testing';

import { DemographicSharedService } from './demographic-shared.service';

describe('DemographicSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemographicSharedService]
    });
  });

  it('should be created', inject([DemographicSharedService], (service: DemographicSharedService) => {
    expect(service).toBeTruthy();
  }));
});
