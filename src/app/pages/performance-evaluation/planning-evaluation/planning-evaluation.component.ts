import { Component, OnInit, EventEmitter } from '@angular/core';
import { PerformanceEvaluationService } from '../../../services/performance-evaluation/performance-evaluation.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { PerformanceEvalSharedService } from '../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { User } from '../../../models/general/user';
// import { Alerts } from '../../../../models/common/alerts/alerts';
// import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-planning-evaluation',
  templateUrl: './planning-evaluation.component.html',
  styleUrls: ['./planning-evaluation.component.css']
})
export class PlanningEvaluationComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Planificación de periodos de objetivos';
  public showExcel: boolean = true;
  public userAuthenticatedObjetives:User;
  public evaluationList: any;
  public editDate: boolean = false;
  token = false;

  constructor(public performanceEvaluationService: PerformanceEvaluationService,
    private accionDataTableService: DataDableSharedService,
    public performanceEvalSharedService: PerformanceEvalSharedService) {

    this.accionDataTableService.getActionDataTable().subscribe((action: any) => {
      debugger
      if (action.action_method === "editPerfomanceEvaluation") {
        this.performanceEvalSharedService.setPlanningEvaluationData(action);
      }
      if (action === "Planificación de periodos de objetivos") {
        this.userAuthenticatedObjetives = JSON.parse(localStorage.getItem("user"));
        this.performanceEvaluationService.getExcelEvaluationObjectives(this.userAuthenticatedObjetives.employee_id.toString()).subscribe((data: any) => {
          window.open(data.url);
        });
      }
    });

    this.performanceEvaluationService.getPlanningEvaluationObjectives().subscribe((table: any) => {
      this.evaluationList = table;
      setTimeout(() => {
        this.objectReport.emit(this.evaluationList);
      }, 100);
    })
  }

  ngOnInit() {
  }

}
