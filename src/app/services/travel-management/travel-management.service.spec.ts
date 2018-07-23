import { TestBed, inject } from '@angular/core/testing';

import { TravelManagementService } from './travel-management.service';

describe('TravelManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelManagementService]
    });
  });

  it('should be created', inject([TravelManagementService], (service: TravelManagementService) => {
    expect(service).toBeTruthy();
  }));
});
