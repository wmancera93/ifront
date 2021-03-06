import { Component, OnInit } from '@angular/core';
import { PerformanceEvalSharedService } from '../../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import {
  FormBuilder,
  FormGroup,
} from '../../../../../../node_modules/@angular/forms';
import { PerformanceEvaluationService } from '../../../../services/performance-evaluation/performance-evaluation.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-planning-date',
  templateUrl: './edit-planning-date.component.html',
  styleUrls: ['./edit-planning-date.component.css'],
})
export class EditPlanningDateComponent implements OnInit {
  public formDate: any;
  public showSubmit = true;
  public idEditDate: any;
  public planningInfo: any;
  public startPlanning: any;
  public endPlanning: any;
  public startDate: any;
  public endDate: any;
  public countAfter = 0;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.performance_evaluation.planning_evaluation.edit_planning_date.${key}`;
  }

  constructor(
    public performanceEvaluationService: PerformanceEvaluationService,
    public performanceEvalSharedService: PerformanceEvalSharedService,
    fb: FormBuilder,
    public alert: AlertsService,
    public translate: TranslateService,
  ) {
    this.formDate = new FormGroup({});
    this.formDate = fb.group({
      start_planning: '',
      end_planning: '',
    });

    this.performanceEvalSharedService
      .getPlanningEvaluationData()
      .subscribe((actionInfo: any) => {
        if (this.countAfter === 0) {
          this.idEditDate = actionInfo.id;
          this.performanceEvaluationService
            .getEvaluationPerformanById(this.idEditDate)
            .subscribe((data: any) => {
              this.planningInfo = data.data;
              // this.startPlanning = data.data.start_planning_date;
              // this.endPlanning = data.data.end_planning_date;

              this.startPlanning = data.data.start_planning_date.split(
                '-',
              );
              this.endPlanning = data.data.end_planning_date.split(
                '-',
              );
              this.startDate = (
                this.startPlanning[2] +
                '-' +
                this.startPlanning[1] +
                '-' +
                this.startPlanning[0]
              ).toString();
              this.endDate = (
                this.endPlanning[2] +
                '-' +
                this.endPlanning[1] +
                '-' +
                this.endPlanning[0]
              ).toString();
              this.formDate = new FormGroup({});
              this.formDate = fb.group({
                start_planning: (
                  this.startPlanning[2] +
                  '-' +
                  this.startPlanning[1] +
                  '-' +
                  this.startPlanning[0]
                ).toString(),
                end_planning: (
                  this.endPlanning[2] +
                  '-' +
                  this.endPlanning[1] +
                  '-' +
                  this.endPlanning[0]
                ).toString(),
              });
            });

          document.getElementById('btn-planningEvaluation').click();
          document
            .getElementById('bodyGeneral')
            .removeAttribute('style');
        }
      });
  }

  ngOnInit() {}

  editDateEvaluation(objectDate) {
    this.showSubmit = false;
    this.performanceEvaluationService
      .putPeriodPlanningEvaluation(this.idEditDate, objectDate)
      .subscribe(
        (response: any) => {
          this.showSubmit = true;
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_ts'),
              message: response.message,
              confirmation: false,
              typeConfirmation: '',
            },
          ];
          document.getElementById('closeModalPlanning').click();
          this.alert.setAlert(alertWarning[0]);
        },
        () => {
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_ts'),
              message: this.t('msg_alert_ts'),
              confirmation: false,
              typeConfirmation: '',
            },
          ];
          document.getElementById('closeModalPlanning').click();
          this.alert.setAlert(alertWarning[0]);
        },
      );
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
