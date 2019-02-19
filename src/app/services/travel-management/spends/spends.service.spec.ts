import { TestBed, inject } from '@angular/core/testing';

import { SpendsService } from './spends.service';

describe('SpendsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpendsService]
    });
  });

  it('should be created', inject([SpendsService], (service: SpendsService) => {
    expect(service).toBeTruthy();
  }));
});
