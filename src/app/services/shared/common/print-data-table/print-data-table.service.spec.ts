import { TestBed, inject } from '@angular/core/testing';

import { PrintDataTableService } from './print-data-table.service';

describe('PrintDataTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintDataTableService]
    });
  });

  it('should be created', inject([PrintDataTableService], (service: PrintDataTableService) => {
    expect(service).toBeTruthy();
  }));
});
