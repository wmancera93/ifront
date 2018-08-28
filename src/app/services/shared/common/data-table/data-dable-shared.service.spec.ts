import { TestBed, inject } from '@angular/core/testing';

import { DataDableSharedService } from './data-dable-shared.service';

describe('DataDableSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataDableSharedService]
    });
  });

  it('should be created', inject([DataDableSharedService], (service: DataDableSharedService) => {
    expect(service).toBeTruthy();
  }));
});
