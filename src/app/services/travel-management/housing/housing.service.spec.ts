import { TestBed, inject } from '@angular/core/testing';

import { HousingService } from './housing.service';

describe('HousingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HousingService]
    });
  });

  it('should be created', inject([HousingService], (service: HousingService) => {
    expect(service).toBeTruthy();
  }));
});
