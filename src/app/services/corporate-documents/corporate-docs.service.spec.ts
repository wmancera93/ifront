import { TestBed, inject } from '@angular/core/testing';

import { CorporateDocsService } from './corporate-docs.service';

describe('CorporateDocsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorporateDocsService]
    });
  });

  it('should be created', inject([CorporateDocsService], (service: CorporateDocsService) => {
    expect(service).toBeTruthy();
  }));
});
