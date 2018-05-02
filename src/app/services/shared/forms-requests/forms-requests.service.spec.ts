import { TestBed, inject } from '@angular/core/testing';

import { FormsRequestsService } from './forms-requests.service';

describe('FormsRequestsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormsRequestsService]
    });
  });

  it('should be created', inject([FormsRequestsService], (service: FormsRequestsService) => {
    expect(service).toBeTruthy();
  }));
});
