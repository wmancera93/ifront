import { TestBed, inject } from '@angular/core/testing';

import { UserSharedService } from './user-shared.service';

describe('UserSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSharedService]
    });
  });

  it('should be created', inject([UserSharedService], (service: UserSharedService) => {
    expect(service).toBeTruthy();
  }));
});
