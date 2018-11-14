import { TestBed, inject } from '@angular/core/testing';

import { ReportTravelsService } from './report-travels.service';

describe('ReportTravelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTravelsService]
    });
  });

  it('should be created', inject([ReportTravelsService], (service: ReportTravelsService) => {
    expect(service).toBeTruthy();
  }));
});
