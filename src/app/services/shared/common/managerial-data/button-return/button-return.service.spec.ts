import { TestBed, inject } from '@angular/core/testing';

import { ButtonReturnService } from './button-return.service';

describe('ButtonReturnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ButtonReturnService]
    });
  });

  it('should be created', inject([ButtonReturnService], (service: ButtonReturnService) => {
    expect(service).toBeTruthy();
  }));
});
