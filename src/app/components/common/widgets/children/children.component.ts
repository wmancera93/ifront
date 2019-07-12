import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorHelper, AdvancedPieChartComponent } from '@swimlane/ngx-charts';
import { DemographicChartsService } from '../../../../services/common/demographic-charts/demographic-charts.service';
import { DemographicSharedService } from '../../../../services/shared/common/demographic/demographic-shared.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit {
  @ViewChild('pieChart') public pieChart: AdvancedPieChartComponent;

  public results: any[] = [];
  public typesIndicators: any[];
  public typeIndicator = 'severity';
  public show = false;

  get typeIndicatorDetails(): any {
    return this.typesIndicators.find(({ value }) => value === this.typeIndicator);
  }

  get data_sheet(): any['data_sheet'] {
    return this.typeIndicatorDetails.data_sheet;
  }
  // options

  view = undefined;
  gradient = false;
  showLegend = true;
  showXAxisLabel = ColorHelper;
  yAxisLabel = 'Population';
  legendPosition = 'below';

  lineChartView: any = undefined;

  // options
  lineChartShowXAxis = true;
  lineChartShowYAxis = true;
  lineChartGradient = false;
  lineChartShowLegend = false;
  lineChartShowXAxisLabel = true;
  lineChartXAxisLabel = 'Country';
  lineChartShowYAxisLabel = true;
  lineChartYAxisLabel = 'Population';

  lineChartColorScheme = {
    domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA'],
  };

  // line, area
  lineChartAutoScale = true;

  colorScheme = 'fire';

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
      {
        name: 'Spain',
        value: 33000,
        extra: {
          code: 'es',
        },
      },
      {
        name: 'Italy',
        value: 35800,
        extra: {
          code: 'it',
        },
      },
    ];
  }

  ngOnInit() {
    this.demographicChartsService.getChildrens().subscribe((data: any) => {});
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.demographicSharedService.getEventUpload().subscribe((data: any) => {
      debugger
      this.pieChart.update();
    });
  }

  onResize(elem: AdvancedPieChartComponent) {
    elem.update();
  }
}
