import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelAllowanceReportComponent } from './travel-allowance-report.component';

describe('TravelAllowanceReportComponent', () => {
  let component: TravelAllowanceReportComponent;
  let fixture: ComponentFixture<TravelAllowanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelAllowanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelAllowanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
