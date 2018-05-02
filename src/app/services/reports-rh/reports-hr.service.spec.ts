import { TestBed, inject } from '@angular/core/testing';

import { ReportsHrService } from './reports-hr.service';

describe('ReportsHrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportsHrService]
    });
  });

  it('should be created', inject([ReportsHrService], (service: ReportsHrService) => {
    expect(service).toBeTruthy();
  }));
});
