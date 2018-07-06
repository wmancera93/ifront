import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawCalendarComponent } from './draw-calendar.component';

describe('DrawCalendarComponent', () => {
  let component: DrawCalendarComponent;
  let fixture: ComponentFixture<DrawCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
