import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelApproverReportComponent } from './travel-approver-report.component';

describe('TravelApproverReportComponent', () => {
  let component: TravelApproverReportComponent;
  let fixture: ComponentFixture<TravelApproverReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelApproverReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelApproverReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
