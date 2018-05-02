import { TestBed, inject } from '@angular/core/testing';

import { MyPublicationsService } from './my-publications.service';

describe('MyPublicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyPublicationsService]
    });
  });

  it('should be created', inject([MyPublicationsService], (service: MyPublicationsService) => {
    expect(service).toBeTruthy();
  }));
});
