import { TestBed, inject } from '@angular/core/testing';

import { DashboardManagerialService } from './dashboard-managerial.service';

describe('DashboardManagerialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardManagerialService]
    });
  });

  it('should be created', inject([DashboardManagerialService], (service: DashboardManagerialService) => {
    expect(service).toBeTruthy();
  }));
});
