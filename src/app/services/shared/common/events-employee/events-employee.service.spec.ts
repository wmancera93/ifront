import { TestBed, inject } from '@angular/core/testing';

import { EventsEmployeeService } from './events-employee.service';

describe('EventsEmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsEmployeeService]
    });
  });

  it('should be created', inject([EventsEmployeeService], (service: EventsEmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
