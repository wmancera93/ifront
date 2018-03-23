import { TestBed, inject } from '@angular/core/testing';

import { EmployeeInfoService } from './employee-info.service';

describe('EmployeeInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeInfoService]
    });
  });

  it('should be created', inject([EmployeeInfoService], (service: EmployeeInfoService) => {
    expect(service).toBeTruthy();
  }));
});
