import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() maxCivilStatus: EventEmitter<any> = new EventEmitter();
  @Input() colorScheme = 'picnic';
  update = debounce(() => this.gauge.update(), 500);

  public results: { name: string; value: number }[] = [];

  view = undefined;
  legendOptions: any;
  min: number = 0;
  max: number = 0;
  legend = true;
  legendTitle = '';
  legendPosition = 'below';
  
  constructor(
    public demographicChartsService: DemographicChartsService,
    public demographicSharedService: DemographicSharedService,
  ) {
    this.results = [
      {
        name: 'Casados',
        value: 50,
      },
      {
        name: 'Solteros',
        value: 4,
      },
      {
        name: 'Divorciados',
        value: 1,
      },
      {
        name: 'Viudos',
        value: 5,
      },
    ];
    this.max = Math.max(...this.results.map(({ value }) => value));
  }

  ngOnInit() {
    // this.demographicChartsService.getCivilStatus().subscribe(({ data }: any) => {
    //   this.results.push(data);
    //   console.log(this.results);
    // });
    this.demographicSharedService.getEventUpload().subscribe((data: any) => {
      this.update();
    });
    let civilStatus = this.results.find(({ value }) => value === this.max).name;
    this.update();
    this.maxCivilStatus.emit(civilStatus);
  }
}
