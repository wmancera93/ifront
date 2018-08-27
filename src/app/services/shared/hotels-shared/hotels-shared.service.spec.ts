import { TestBed, inject } from '@angular/core/testing';

import { HotelsSharedService } from './hotels-shared.service';

describe('HotelsSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotelsSharedService]
    });
  });

  it('should be created', inject([HotelsSharedService], (service: HotelsSharedService) => {
    expect(service).toBeTruthy();
  }));
});
