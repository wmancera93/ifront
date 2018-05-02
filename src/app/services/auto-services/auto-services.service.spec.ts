import { TestBed, inject } from '@angular/core/testing';

import { AutoServicesService } from './auto-services.service';

describe('AutoServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoServicesService]
    });
  });

  it('should be created', inject([AutoServicesService], (service: AutoServicesService) => {
    expect(service).toBeTruthy();
  }));
});
