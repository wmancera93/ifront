import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalChartComponent } from './hierarchical-chart.component';

describe('HierarchicalChartComponent', () => {
  let component: HierarchicalChartComponent;
  let fixture: ComponentFixture<HierarchicalChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
