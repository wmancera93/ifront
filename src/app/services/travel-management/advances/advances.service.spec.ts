import { TestBed, inject } from '@angular/core/testing';

import { AdvancesService } from './advances.service';

describe('AdvancesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvancesService]
    });
  });

  it('should be created', inject([AdvancesService], (service: AdvancesService) => {
    expect(service).toBeTruthy();
  }));
});
