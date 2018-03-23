import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayLetterComponent } from './holiday-letter.component';

describe('HolidayLetterComponent', () => {
  let component: HolidayLetterComponent;
  let fixture: ComponentFixture<HolidayLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
