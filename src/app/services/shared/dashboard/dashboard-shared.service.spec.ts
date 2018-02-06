import { TestBed, inject } from '@angular/core/testing';

import { DashboardSharedService } from './dashboard-shared.service';

describe('DashboardSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardSharedService]
    });
  });

  it('should be created', inject([DashboardSharedService], (service: DashboardSharedService) => {
    expect(service).toBeTruthy();
  }));
});
