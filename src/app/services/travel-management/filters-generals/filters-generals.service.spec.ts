import { TestBed, inject } from '@angular/core/testing';

import { FiltersGeneralsService } from './filters-generals.service';

describe('FiltersGeneralsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltersGeneralsService]
    });
  });

  it('should be created', inject([FiltersGeneralsService], (service: FiltersGeneralsService) => {
    expect(service).toBeTruthy();
  }));
});
