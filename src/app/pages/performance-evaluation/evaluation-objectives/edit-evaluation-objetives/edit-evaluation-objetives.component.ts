import { Component, OnInit, EventEmitter } from '@angular/core';
import { PerformanceEvaluationService } from '../../../../services/performance-evaluation/performance-evaluation.service';
import {
  PerformanceEvaluation,
  Qualifier
} from '../../../../models/common/performance-evaluation/performance-evaluation';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { PerformanceEvalSharedService } from '../../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-evaluation-objetives',
  templateUrl: './edit-evaluation-objetives.component.html',
  styleUrls: ['./edit-evaluation-objetives.component.css']
})
export class EditEvaluationObjetivesComponent implements OnInit {
  public idEvaluation = '';
  public EvaluacionPer: PerformanceEvaluation = null;
  public sendDataObjective: any;
  public qualifierData: Qualifier[] = [];
  public namecomplete = '';
  public ObjectivesTable: any[] = [];
  public edithObjectivesTable: any[] = [];
  public bedit = false;
  public bnew = false;
  public idEdit: number;
  public showSubmit = true;
  public formObjetive: any;
  public showPdf = false;
  public showSizeTable = false;
  public is_collapse = false;
  public flag_complete = false;
  public showCharge = true;
  public status = true;
  public countAfter = 0;

  public objectReport: EventEmitter<any> = new EventEmitter();

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.performance_evaluation.evaluation_objetives.edit_evaluation_objetives.${key}`;
  }

  constructor(
    public performanceEvaluationService: PerformanceEvaluationService,
    private fb: FormBuilder,
    private accionDataTableService: DataDableSharedService,
    public performanceEvalSharedService: PerformanceEvalSharedService,
    public alert: AlertsService,
    public translate: TranslateService
  ) {
    this.alert.getActionConfirm().subscribe(data => {
      if (
        data === 'closeAlertevaluationObjectives' ||
        'evaluationObjectives' ||
        'deleteEvaluationByObjetive' ||
        'closeAlertdeleteEvaluationByObjetive'
      ) {
        this.dataTableConsult();
        document.getElementById('btn-evaluationObjetives').click();
        this.showCharge = true;
        this.formObjetive = new FormGroup({});
        this.formObjetive = fb.group({
          start_date: '',
          end_date: '',
          weight: '',
          objetive_text: ''
        });
      }
      this.performanceEvalSharedService.setRefrehsEval(true);
    });

    this.performanceEvalSharedService
      .getEvaluationPerformanceData()
      .subscribe((info: any) => {
        if (this.countAfter === 0) {
          this.EvaluacionPer = info;
          this.qualifierData = info.qualifier;
          this.idEvaluation = info.perfomance_evaluation_id;
          this.status = true;
          document.getElementById('btn-evaluationObjetives').click();
          document.getElementById('bodyGeneral').removeAttribute('style');

          if (this.EvaluacionPer.current_weight == '100.0') {
            this.flag_complete = true;
          } else {
            this.flag_complete = false;
          }
          this.dataTableConsult();
        }
      });
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.formObjetive = new FormGroup({});
    this.formObjetive = fb.group({
      start_date: '',
      end_date: '',
      weight: '',
      objetive_text: ''
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === 'updateEvaluationObjetive') {
        document.getElementById('funtionObjectives').click();
        setTimeout(() => {
          document.getElementById('modal_evaluationObjetives').scrollTo(0, 800);
        }, 200);
        this.idEdit = data.id;
        this.bedit = true;
        this.bnew = false;
        this.performanceEvaluationService
          .getEvaluationObjetiveID(data.id)
          .subscribe((dataID: any) => {
            const startDate = dataID.data.start_date_obj.split('/');
            const endDate = dataID.data.end_date_obj.split('/');
            this.formObjetive = new FormGroup({});

            this.formObjetive = fb.group({
              start_date: (
                startDate[2] +
                '-' +
                startDate[1] +
                '-' +
                startDate[0]
              ).toString(),
              end_date: (
                endDate[2] +
                '-' +
                endDate[1] +
                '-' +
                endDate[0]
              ).toString(),
              weight: dataID.data.weight_value * 100,
              objetive_text: dataID.data.objetive_text
            });
          });
      }
      if (data.action_method === 'deleteEvaluationObjetive') {
        this.performanceEvaluationService
          .deleteEvaluationObjetive(data.id)
          .subscribe((state: any) => {
            this.EvaluacionPer = state.data[0];
            if (this.EvaluacionPer.current_weight == '100.0') {
              this.flag_complete = true;
            } else {
              this.flag_complete = false;
            }
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('type_alert_ts'),
                message: state.message,
                confirmation: true,
                typeConfirmation: 'deleteEvaluationByObjetive'
              }
            ];
            this.dataTableConsult();
            document.getElementById('closeModalObjectiveEvaluation').click();
            this.alert.setAlert(alertWarning[0]);
          });
      }
    });
  }

  dataTableConsult() {
    this.ObjectivesTable = [];
    this.performanceEvaluationService
      .getEvaluationObjetive(this.idEvaluation, this.status)
      .subscribe((table: any) => {
        if (table.data !== null) {
          this.ObjectivesTable = table;
          setTimeout(() => {
            this.objectReport.emit(this.ObjectivesTable);
          }, 500);
        } else {
          this.ObjectivesTable = [];
          this.objectReport.emit({ success: true, data: this.ObjectivesTable });
        }
      });
  }

  ngOnInit() {}
  newObjetive(model) {
    this.showSubmit = false;
    this.sendDataObjective = {
      perfomance_evaluation_id: this.idEvaluation,
      objetive_text: model.objetive_text,
      target_agrement_date: new Date(),
      start_date: model.start_date,
      end_date: model.end_date,
      weight: model.weight / 100
    };
    if (this.bedit) {
      this.performanceEvaluationService
        .putEvaluationObjetive(this.idEdit, this.sendDataObjective)
        .subscribe(
          (edit: any) => {
            this.EvaluacionPer = edit.data[0];
            if (this.EvaluacionPer.current_weight == '100.0') {
              this.flag_complete = true;
            } else {
              this.flag_complete = false;
            }
            this.showSubmit = true;
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('type_alert_ts'),
                message: edit.message,
                confirmation: true,
                typeConfirmation: 'evaluationObjectives'
              }
            ];
            this.closeObjetive();
            document.getElementById('closeModalObjectiveEvaluation').click();
            this.dataTableConsult();
            this.alert.setAlert(alertWarning[0]);
          },
          (error: any) => {
            const alertWarning: Alerts[] = [
              {
                type: 'danger',
                title: this.t('type_alert_one_ts'),
                message: error.json().errors.toString(),
                confirmation: true,
                typeConfirmation: 'evaluationObjectives'
              }
            ];
            this.closeObjetive();
            document.getElementById('closeModalObjectiveEvaluation').click();
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
          }
        );
    } else {
      this.performanceEvaluationService
        .postEvaluationObjetive(this.sendDataObjective)
        .subscribe(
          (info: any) => {
            this.EvaluacionPer = info.data[0];
            if (this.EvaluacionPer.current_weight == '100.0') {
              this.flag_complete = true;
            } else {
              this.flag_complete = false;
            }
            this.showSubmit = true;
            const alertWarning: Alerts[] = [
              {
                type: 'success',
                title: this.t('type_alert_ts'),
                message: info.message,
                confirmation: true,
                typeConfirmation: 'evaluationObjectives'
              }
            ];
            this.closeObjetive();
            this.dataTableConsult();

            document.getElementById('closeModalObjectiveEvaluation').click();
            this.alert.setAlert(alertWarning[0]);
          },
          (error: any) => {
            const alertWarning: Alerts[] = [
              {
                type: 'danger',
                title: this.t('type_alert_one_ts'),
                message: error.json().errors.toString(),
                confirmation: true,
                typeConfirmation: 'evaluationObjectives'
              }
            ];
            this.closeObjetive();
            document.getElementById('closeModalObjectiveEvaluation').click();
            this.alert.setAlert(alertWarning[0]);
            this.showSubmit = true;
          }
        );
    }
  }

  colapseNew() {
    if (!this.bnew) {
      this.bnew = true;
    } else {
      this.bnew = false;
    }
    document.getElementById('funtionObjectives').click();
    setTimeout(() => {
      document.getElementById('modal_evaluationObjetives').scrollTo(0, 800);
    }, 200);
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }
  closeObjetive() {
    this.is_collapse = false;
    this.showSubmit = true;
    this.bedit = false;
    this.bnew = false;
    document.getElementById('funtionObjectives').click();

    this.formObjetive = this.fb.group({
      start_date: '',
      end_date: '',
      weight: '',
      objetive_text: ''
    });
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }

  // validatePercentage(param) {debugger
  //
  //   console.log(this.ObjectivesTable);
  // }
  evaluationComplete() {
    this.showCharge = false;
    this.performanceEvaluationService
      .putSendEvaluationsComplete(this.idEvaluation)
      .subscribe(
        (data: any) => {
          document.getElementById('closeModalObjectiveEvaluation').click();
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_ts'),
              message: data.message,
              confirmation: false
            }
          ];
          this.alert.setAlert(alertWarning[0]);
          this.performanceEvalSharedService.setRefrehsEval(true);
        },
        (error: any) => {
          document.getElementById('closeModalObjectiveEvaluation').click();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_one_ts'),
              message:
                error.json().errors.toString() + this.t('message_alert_ts'),
              confirmation: true,
              typeConfirmation: 'evaluationObjectives'
            }
          ];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
        }
      );
  }
}
