import { TestBed, inject } from '@angular/core/testing';

import { MyTeamInfoService } from './my-team-info.service';

describe('MyTeamInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTeamInfoService]
    });
  });

  it('should be created', inject([MyTeamInfoService], (service: MyTeamInfoService) => {
    expect(service).toBeTruthy();
  }));
});
