import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { BarVerticalComponent } from '@swimlane/ngx-charts';
import debounce from 'lodash/debounce';
import { DemographicChartsService } from '../../../../services/common/demographic-charts/demographic-charts.service';
import { DemographicSharedService } from '../../../../services/shared/common/demographic/demographic-shared.service';
@Component({
  selector: 'app-generations',
  templateUrl: './generations.component.html',
  styleUrls: ['./generations.component.css'],
})
export class GenerationsComponent implements OnInit {
  @ViewChild('barVertical') public barVertical: BarVerticalComponent;
  @Output() maxGenerations: EventEmitter<any> = new EventEmitter();
  @Input() colorScheme = 'natural';

  update = debounce(() => this.barVertical.update(), 500);

  public results: any[] = [];

  view = undefined;
  xAxis = true;
  yAxis = true;

  constructor(
    public demographicChartsService: DemographicChartsService,
    public demographicSharedService: DemographicSharedService,
  ) {
    this.demographicSharedService.getEventUpload().subscribe((data: any) => {
      this.update();
    });
  }

  ngOnInit() {
    this.update();
    this.demographicChartsService.getGenerations().subscribe(({ data }: any) => {
      this.results = data;
      let maxValue = Math.max(...this.results.map(({ value }) => value));
      let maxName = this.results.find(({ value }) => value === maxValue).name;
      this.maxGenerations.emit(maxName);
    });
  }
}
