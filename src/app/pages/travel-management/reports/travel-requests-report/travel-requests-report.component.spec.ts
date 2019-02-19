import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestsReportComponent } from './travel-requests-report.component';

describe('TravelRequestsReportComponent', () => {
  let component: TravelRequestsReportComponent;
  let fixture: ComponentFixture<TravelRequestsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelRequestsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelRequestsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
