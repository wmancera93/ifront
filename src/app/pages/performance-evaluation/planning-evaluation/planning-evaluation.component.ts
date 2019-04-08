import {
  Component,
  OnInit,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { PerformanceEvaluationService } from '../../../services/performance-evaluation/performance-evaluation.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { PerformanceEvalSharedService } from '../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-planning-evaluation',
  templateUrl: './planning-evaluation.component.html',
  styleUrls: ['./planning-evaluation.component.css'],
})
export class PlanningEvaluationComponent
  implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public showExcel = true;
  public userAuthenticatedObjetives: User;
  public evaluationList: any;
  private subscriptions: ISubscription[];
  public editDate = false;
  token = false;

  parseT(key) {
    return `pages.performance_evaluation.planning_evaluation.${key}`;
  }

  constructor(
    public performanceEvaluationService: PerformanceEvaluationService,
    private accionDataTableService: DataDableSharedService,
    public performanceEvalSharedService: PerformanceEvalSharedService,
  ) {
    this.subscriptions = [
      this.accionDataTableService
        .getActionDataTable()
        .subscribe((action: any) => {
          if (action.action_method === 'editPerfomanceEvaluation') {
            this.performanceEvalSharedService.setPlanningEvaluationData(
              action,
            );
          }
          this.userAuthenticatedObjetives = JSON.parse(
            localStorage.getItem('user'),
          );
          this.performanceEvaluationService
            .getExcelEvaluationObjectives(
              this.userAuthenticatedObjetives.employee_id.toString(),
            )
            .subscribe((data: any) => {
              window.open(data.url);
            });
        }),
      this.performanceEvaluationService
        .getPlanningEvaluationObjectives()
        .subscribe((table: any) => {
          this.evaluationList = table;
          setTimeout(() => {
            this.objectReport.emit(this.evaluationList);
          }, 100);
        }),
    ];
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
