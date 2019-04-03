import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingReportComponent } from './housing-report.component';

describe('HousingReportComponent', () => {
  let component: HousingReportComponent;
  let fixture: ComponentFixture<HousingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
