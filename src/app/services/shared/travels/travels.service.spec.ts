import { TestBed, inject } from '@angular/core/testing';

import { TravelsService } from './travels.service';

describe('TravelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelsService]
    });
  });

  it('should be created', inject([TravelsService], (service: TravelsService) => {
    expect(service).toBeTruthy();
  }));
});
