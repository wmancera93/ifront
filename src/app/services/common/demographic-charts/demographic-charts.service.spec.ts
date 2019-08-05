import { TestBed, inject } from '@angular/core/testing';

import { DemographicChartsService } from './demographic-charts.service';

describe('DemographicChartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemographicChartsService]
    });
  });

  it('should be created', inject([DemographicChartsService], (service: DemographicChartsService) => {
    expect(service).toBeTruthy();
  }));
});
