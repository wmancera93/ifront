import { Component, OnInit, EventEmitter } from '@angular/core';
import { PerformanceEvaluationService } from '../../../../services/performance-evaluation/performance-evaluation.service';
import { PerformanceEvaluation, Qualifier } from '../../../../models/common/performance-evaluation/performance-evaluation';
import { TablesPermisions } from '../../../../models/common/tables/tables';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { PerformanceEvalSharedService } from '../../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { start } from 'repl';


@Component({
  selector: 'app-edit-evaluation-objetives',
  templateUrl: './edit-evaluation-objetives.component.html',
  styleUrls: ['./edit-evaluation-objetives.component.css']
})
export class EditEvaluationObjetivesComponent implements OnInit {

  public idEvaluation: number;
  public EvaluacionPer: PerformanceEvaluation = null;
  public sendDataObjective: any;
  public qualifierData: Qualifier[] = [];
  public namecomplete: string = "";
  public ObjectivesTable: any[] = [];
  public edithObjectivesTable: any[] = [];
  public bedit: boolean = false;
  public bnew: boolean = false;
  public idEdit: number;
  public showSubmit = true;
  public formObjetive: any;
  public showPdf: boolean = false;
  public showSizeTable: boolean = false;
  public is_collapse: boolean = false;
  public nameReport: string = 'Objetivos de Evaluación';

  public objectReport: EventEmitter<any> = new EventEmitter();

  constructor(public performanceEvaluationService: PerformanceEvaluationService,
    private fb: FormBuilder, private accionDataTableService: DataDableSharedService,
    public performanceEvalSharedService: PerformanceEvalSharedService,
    public alert: AlertsService) {

    this.performanceEvalSharedService.getEvaluationPerformanceData().subscribe((info: any) => {
      this.EvaluacionPer = info;
      this.qualifierData = info.qualifier;
      this.idEvaluation = this.EvaluacionPer.id;
      document.getElementById('btn-evaluationObjetives').click();
      document.getElementById('bodyGeneral').removeAttribute('style');
    })
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.formObjetive = new FormGroup({});
    this.formObjetive = fb.group({
      start_date: '',
      end_date: '',
      weight: '',
      objetive_text: '',
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === "updateEvaluationObjetive") {
        document.getElementById("funtionObjectives").click();
        this.idEdit = data.id;
        this.bedit = true;
        this.performanceEvaluationService.getEvaluationObjetiveID(data.id).subscribe((dataID: any) => {
          let startDate = dataID.data.start_date_obj.split("-");
          let endDate = dataID.data.end_date_obj.split("-");
          this.formObjetive = new FormGroup({});
          this.formObjetive = fb.group({
            start_date: (startDate[2] + "-" + startDate[1] + "-" + startDate[0]).toString(),
            end_date: (endDate[2] + "-" + endDate[1] + "-" + endDate[0]).toString(),
            weight: (dataID.data.weight_value * 100),
            objetive_text: dataID.data.objetive_text
          });
        });
      }
      if (data.action_method === "deleteEvaluationObjetive") {
        this.performanceEvaluationService.deleteEvaluationObjetive(data.id).subscribe((state: any) => {
          const alertWarning: Alerts[] = [{
            type: 'success',
            title: 'Confirmación',
            message: state.message,
            confirmation: false,
            typeConfirmation: ''
          }];
          this.dataTableConsult();          
        document.getElementById("closeModalObjectiveEvaluation").click();
          this.alert.setAlert(alertWarning[0]);
        })
      }
    });

    this.dataTableConsult();
  }

  dataTableConsult() {
    this.performanceEvaluationService.getEvaluationObjetive().subscribe((table: any) => {
      this.ObjectivesTable = table;
      setTimeout(() => {
        this.objectReport.emit(this.ObjectivesTable);
      }, 100);
    })
  }


  ngOnInit() {


  }
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
      this.performanceEvaluationService.putEvaluationObjetive(this.idEdit, this.sendDataObjective).subscribe((edit: any) => {
        this.showSubmit = true;
        const alertWarning: Alerts[] = [{
          type: 'success',
          title: 'Confirmación',
          message: edit.message,
          confirmation: false,
          typeConfirmation: ''
        }];
        document.getElementById("closeModalObjectiveEvaluation").click();
        this.dataTableConsult();
        this.alert.setAlert(alertWarning[0]);
      },
        (error: any) => {
          const alertWarning: Alerts[] = [{
            type: 'danger',
            title: 'Advertencia',
            message: error._body.errors,
            confirmation: false,
            typeConfirmation: ''
          }];

          document.getElementById("closeModalObjectiveEvaluation").click();
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
        })

    }
    else {
      this.performanceEvaluationService.postEvaluationObjetive(this.sendDataObjective).subscribe((info: any) => {
        this.showSubmit = true;
        const alertWarning: Alerts[] = [{
          type: 'success',
          title: 'Confirmación',
          message: info.message,
          confirmation: false,
          typeConfirmation: ''
        }];

        this.dataTableConsult();
        document.getElementById("closeModalObjectiveEvaluation").click();
        this.alert.setAlert(alertWarning[0]);

      },
        (error: any) => {
          const alertWarning: Alerts[] = [{
            type: 'danger',
            title: 'Advertencia',
            message: error._body.errors,
            confirmation: false,
            typeConfirmation: ''
          }];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
        })
    }


  }
  colapseNew() {
    if (!this.bnew) {
      this.bnew = true
    } else {
      this.bnew = false
    }
    document.getElementById("funtionObjectives").click();
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }
  closeObjetive() {
    this.is_collapse = false;
    this.showSubmit = true;
    this.bedit = false;
    this.bnew = false
    this.formObjetive = this.fb.group({
      start_date: '',
      end_date: '',
      weight: '',
      objetive_text: '',
    });
  }

}
