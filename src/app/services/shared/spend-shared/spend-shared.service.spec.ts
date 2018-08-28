import { TestBed, inject } from '@angular/core/testing';

import { SpendSharedService } from './spend-shared.service';

describe('SpendSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpendSharedService]
    });
  });

  it('should be created', inject([SpendSharedService], (service: SpendSharedService) => {
    expect(service).toBeTruthy();
  }));
});
