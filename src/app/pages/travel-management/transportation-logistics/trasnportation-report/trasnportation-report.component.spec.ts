import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasnportationReportComponent } from './trasnportation-report.component';

describe('TrasnportationReportComponent', () => {
  let component: TrasnportationReportComponent;
  let fixture: ComponentFixture<TrasnportationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasnportationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasnportationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
