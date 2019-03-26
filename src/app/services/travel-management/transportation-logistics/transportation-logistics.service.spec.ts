import { TestBed, inject } from '@angular/core/testing';

import { TransportationLogisticsService } from './transportation-logistics.service';

describe('TransportationLogisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportationLogisticsService]
    });
  });

  it('should be created', inject([TransportationLogisticsService], (service: TransportationLogisticsService) => {
    expect(service).toBeTruthy();
  }));
});
