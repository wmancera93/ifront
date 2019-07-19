import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BarVerticalComponent } from '@swimlane/ngx-charts';
import debounce from 'lodash/debounce';
import { DemographicChartsService } from '../../../../services/common/demographic-charts/demographic-charts.service';
import { DemographicSharedService } from '../../../../services/shared/common/demographic/demographic-shared.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
})
export class GenderComponent implements OnInit {
  @ViewChild('barVertical') public barVertical: BarVerticalComponent;
  @Output() object: EventEmitter<any> = new EventEmitter();

  updateBar = debounce(() => this.barVertical.update(), 500);

  public results: any[] = [];

  view = undefined;
  xAxis = true;
  yAxis = true;
  colorScheme = 'ocean';

  constructor(
    public demographicChartsService: DemographicChartsService,
    public demographicSharedService: DemographicSharedService,
  ) {
    this.demographicSharedService.getEventUpload().subscribe((data: any) => {
      this.updateBar();
    });
  }

  ngOnInit() {
    this.updateBar();
    this.demographicChartsService.getGender().subscribe(({ data }: any) => {
      this.results = data;
      this.object.emit(this.results);
    });
  }
}
