import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DemographicChartsService } from '../../../../services/common/demographic-charts/demographic-charts.service';
import { DemographicSharedService } from '../../../../services/shared/common/demographic/demographic-shared.service';
import { PieGridComponent, ColorHelper } from '@swimlane/ngx-charts';
import debounce from 'lodash/debounce';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { JoyrideAppService } from '../../../../services/joyride-app/joyride-app.service';
import { ISubscription } from 'rxjs/Subscription';
import { steps } from '../../dashboard.component';

@Component({
  selector: 'app-demographic-chart',
  templateUrl: './demographic-chart.component.html',
  styleUrls: ['./demographic-chart.component.css'],
})
export class DemographicChartComponent implements OnInit {
  @ViewChild('pieGridEmployee') public pieGridEmployee: PieGridComponent;

  public maxValueChildren = { name: '', value: 0 };
  public maxValueCivilStatus = { name: '' };
  public maxValueCivilGenerations = { name: '' };
  public woman: number = 0;
  public man: number = 0;
  public totalArea: number = 0;
  public totalEmployee: number = 0;
  public result: PieGridComponent['results'] = [];
  public colorChart: string = 'natural';
  public listColors = colorSets;
  public color?: typeof colorSets[0];
  public colorScheme: string = 'natural';
  public joyrideSubscription: ISubscription;
  public steps = steps;
  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.dashboard.${key}`;
  }

  constructor(
    public router: Router,
    public demographicChartsService: DemographicChartsService,
    public demographicSharedService: DemographicSharedService,
    public joyrideAppService: JoyrideAppService
    
  ) {
    this.demographicSharedService.getEventUpload().subscribe((data: any) => {});
    this.color = this.listColors.find(({ name }) => name == this.colorScheme);

    this.joyrideSubscription = joyrideAppService.onStartTour.subscribe(() => {
      joyrideAppService
        .startTour({ steps: this.steps, startWith: 'step_18@ihr/demographic_chart' })
        .subscribe(({ name, actionType }) => {
          /* if (name === 'step_17' && actionType === 'PREV' && !routerSuscribe) {
          setTimeout(() => {
            this.vieweDashboardManager();
            this.prendido.nativeElement.checked = false;
            this.apagado.nativeElement.checked = true;
            this.joyrideAppService.reloadStep();
            routerSuscribe = undefined;
          }, 2000);
        } */
        });
    });




  }

  ngOnInit() {
    this.demographicChartsService.getAreaNumber().subscribe(({ data }) => {
      data.forEach(element => {
        this.totalEmployee += element.value;
      });
      this.result.push({
        name: 'Colaboradores',
        value: this.totalEmployee,
        extra: { percentage: (this.totalEmployee / this.totalEmployee) * 100 },
      });
      this.result = [...this.result];
    });
    console.log(this.listColors);
  }
  returnDahsboardGerencial() {
    this.router.navigate(['ihr/index']);
  }
  setMaxValueChildren(value) {
    this.maxValueChildren = value;
  }
  setMaxValueCivilStatus(value) {
    this.maxValueCivilStatus = value;
  }
  setMaxValueGeneration(value) {
    this.maxValueCivilGenerations = value;
  }
  objectgender(value) {
    this.man = value[0].value;
    this.woman = value[1].value;
    this.totalArea = this.man + this.woman;
    const updateObject = debounce(() => {
      if (!this.totalEmployee) {
        updateObject();
      } else {
        this.result.push({
          name: 'Colaboradores',
          value: this.totalArea,
          extra: { percentage: (this.totalArea / this.totalEmployee) * 100 },
        });
        this.result = [...this.result];
      }
    }, 500);
    updateObject();
  }

  selectColor({ target: { value } }: { target: HTMLInputElement } & Event) {
    this.color = this.listColors[value];
    this.colorScheme = this.color.name;
  }
  ngOnDestroy(): void {
    this.joyrideSubscription.unsubscribe();
  }
}
