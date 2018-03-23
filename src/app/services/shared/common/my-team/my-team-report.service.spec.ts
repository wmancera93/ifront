import { TestBed, inject } from '@angular/core/testing';

import { MyTeamReportService } from './my-team-report.service';

describe('MyTeamReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTeamReportService]
    });
  });

  it('should be created', inject([MyTeamReportService], (service: MyTeamReportService) => {
    expect(service).toBeTruthy();
  }));
});
