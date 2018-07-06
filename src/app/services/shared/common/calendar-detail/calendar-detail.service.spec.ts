import { TestBed, inject } from '@angular/core/testing';

import { CalendarDetailService } from './calendar-detail.service';

describe('CalendarDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarDetailService]
    });
  });

  it('should be created', inject([CalendarDetailService], (service: CalendarDetailService) => {
    expect(service).toBeTruthy();
  }));
});
