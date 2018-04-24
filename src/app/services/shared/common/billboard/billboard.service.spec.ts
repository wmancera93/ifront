import { TestBed, inject } from '@angular/core/testing';

import { BillboardService } from './billboard.service';

describe('BillboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillboardService]
    });
  });

  it('should be created', inject([BillboardService], (service: BillboardService) => {
    expect(service).toBeTruthy();
  }));
});
