import { Component, OnInit } from '@angular/core';
import { ColorHelper } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit {
  public results: any[] = [];
  public typesIndicators: any[];
  public typeIndicator = 'severity';

  get typeIndicatorDetails(): any {
    return this.typesIndicators.find(({ value }) => value === this.typeIndicator);
  }

  get data_sheet(): any['data_sheet'] {
    return this.typeIndicatorDetails.data_sheet;
  }
  // options

  gradient = false;
  showLegend = true;
  showXAxisLabel = ColorHelper;
  yAxisLabel = 'Population';
  legendPosition = 'below';

  lineChartView: any[] = [550, 400];

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

  constructor() {
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
