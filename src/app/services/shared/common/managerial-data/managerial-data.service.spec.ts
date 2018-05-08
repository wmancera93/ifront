import { TestBed, inject } from '@angular/core/testing';

import { ManagerialDataService } from './managerial-data.service';

describe('ManagerialDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerialDataService]
    });
  });

  it('should be created', inject([ManagerialDataService], (service: ManagerialDataService) => {
    expect(service).toBeTruthy();
  }));
});
