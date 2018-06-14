import { TestBed, inject } from '@angular/core/testing';

import { StylesExplorerService } from './styles-explorer.service';

describe('StylesExplorerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StylesExplorerService]
    });
  });

  it('should be created', inject([StylesExplorerService], (service: StylesExplorerService) => {
    expect(service).toBeTruthy();
  }));
});
