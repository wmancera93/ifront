import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsEmployeesComponent } from './events-employees.component';

describe('EventsEmployeesComponent', () => {
  let component: EventsEmployeesComponent;
  let fixture: ComponentFixture<EventsEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
