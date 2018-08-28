import { TestBed, inject } from '@angular/core/testing';

import { DataMasterSharedService } from './data-master-shared.service';

describe('DataMasterSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataMasterSharedService]
    });
  });

  it('should be created', inject([DataMasterSharedService], (service: DataMasterSharedService) => {
    expect(service).toBeTruthy();
  }));
});
