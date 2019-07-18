import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ColorHelper, AdvancedPieChartComponent } from '@swimlane/ngx-charts';
import { DemographicChartsService } from '../../../../services/common/demographic-charts/demographic-charts.service';
import { DemographicSharedService } from '../../../../services/shared/common/demographic/demographic-shared.service';
import { element } from 'protractor';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit {
  @ViewChild('pieChart') public pieChart: AdvancedPieChartComponent;
  @Output() maxValue: EventEmitter<any> = new EventEmitter();

  public results: any[] = [];
  
  public show = false;
  public total = 0;

  // options
  view = undefined;
  label = 'Total ...';


  // line, area
  lineChartAutoScale = true;

  onSelect(event) {
    console.log(event);
  }

  constructor(
    public demographicChartsService: DemographicChartsService,
    public demographicSharedService: DemographicSharedService,
  ) {
    setTimeout(() => {
      this.show = true;
    }, 1000);
  }

  ngOnInit() {
    this.demographicChartsService.getChildrens().subscribe(({ data }: { data: any[] }) => {
      let maxValue = { value: 0, name: '' };
      this.results = data.map(({ value, name }) => {
        const nameCovert = name + ' ' + (name == 0 || name == 1 ? 'Hijo' : 'Hijos');
        if (value > maxValue.value) {
          maxValue = { value, name: nameCovert };
        }
        this.total += Number(value);
        return {
          name: nameCovert,
          value,
          extra: { name },
        };
      });
      this.label = 'Hijos en total';
      this.maxValue.emit(maxValue);
    });
    this.demographicSharedService.getEventUpload().subscribe((data: any) => {
      this.pieChart.update();
    });
  }

  valueFormatting = value => {
    if (value === this.total) {
      let total = 0;
      this.results.forEach(({ extra: { name }, value }) => {
        total += Number(name) * value;
      });
      return total;
    }
    return value;
  };
}
