import { TestBed, inject } from '@angular/core/testing';

import { DashboardEmployeeService } from './dashboard-employee.service';

describe('DashboardEmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardEmployeeService]
    });
  });

  it('should be created', inject([DashboardEmployeeService], (service: DashboardEmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
