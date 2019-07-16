import { Component, OnInit, ViewChild } from '@angular/core';
import { GaugeComponent } from '@swimlane/ngx-charts';
import { DemographicChartsService } from '../../../../services/common/demographic-charts/demographic-charts.service';
import { DemographicSharedService } from '../../../../services/shared/common/demographic/demographic-shared.service';
import debounce from 'lodash/debounce';

@Component({
  selector: 'app-civil-status',
  templateUrl: './civil-status.component.html',
  styleUrls: ['./civil-status.component.css'],
})
export class CivilStatusComponent implements OnInit {
  @ViewChild('gauge') public gauge: GaugeComponent;

  update = debounce(() => this.gauge.update(), 500);

  public maxNumber: number;
  public results: any[] = [];

  view = undefined;
  legendOptions: any;
  min: number = 0;
  max: number = this.maxNumber;
  legend = true;
  legendTitle = 'Estados civiles';
  legendPosition = 'below';
  constructor(
    public demographicChartsService: DemographicChartsService,
    public demographicSharedService: DemographicSharedService,
  ) {
    this.update();
    this.results = [
      {
        name: 'Germany',
        value: 40632,
        extra: {
          code: 'de',
        },
      },
      {
        name: 'United States',
        value: 50000,
        extra: {
          code: 'us',
        },
      },
      {
        name: 'France',
        value: 36745,
        extra: {
          code: 'fr',
        },
      },
      {
        name: 'United Kingdom',
        value: 36240,
        extra: {
          code: 'uk',
        },
      },
    ];
  }

  ngOnInit() {
    // this.demographicChartsService.getCivilStatus().subscribe(({ data }: any) => {
    //   this.results.push(data);
    //   console.log(this.results);
    // });
  }
  onResize() {
    this.update();
  }
}
