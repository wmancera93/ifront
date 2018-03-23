import { TestBed, inject } from '@angular/core/testing';

import { HierarchicalChartService } from './hierarchical-chart.service';

describe('HierarchicalChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HierarchicalChartService]
    });
  });

  it('should be created', inject([HierarchicalChartService], (service: HierarchicalChartService) => {
    expect(service).toBeTruthy();
  }));
});
