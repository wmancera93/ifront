import { TestBed, inject } from '@angular/core/testing';

import { JoyrideAppService } from './joyride-app.service';

describe('JoyrideStepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoyrideAppService],
    });
  });

  it('should be created', inject(
    [JoyrideAppService],
    (service: JoyrideAppService) => {
      expect(service).toBeTruthy();
    },
  ));
});
