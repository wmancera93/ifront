import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAdvanceReportComponent } from '../travel-advance-report/travel-advance-report.component';

describe('TravelAdvanceReportComponent', () => {
  let component: TravelAdvanceReportComponent;
  let fixture: ComponentFixture<TravelAdvanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAdvanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAdvanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
