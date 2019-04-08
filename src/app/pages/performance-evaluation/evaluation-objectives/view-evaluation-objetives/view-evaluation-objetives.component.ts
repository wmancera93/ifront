import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { PerformanceEvaluationService } from '../../../../services/performance-evaluation/performance-evaluation.service';
import { PerformanceEvalSharedService } from '../../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { Qualifier } from '../../../../models/common/performance-evaluation/performance-evaluation';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-view-evaluation-objetives',
  templateUrl: './view-evaluation-objetives.component.html',
  styleUrls: ['./view-evaluation-objetives.component.css'],
})
export class ViewEvaluationObjetivesComponent implements OnInit, OnDestroy {
  public countAfter = 0;
  public EvaluacionPerView: any = null;
  public qualifierDataView: Qualifier[] = [];
  public idEvaluation: string;
  public status = false;
  public ObjectivesTableView: any[] = [];
  public objectReportEval: EventEmitter<any> = new EventEmitter();
  private subscriptions: ISubscription;

  parseT(key) {
    return `pages.performance_evaluation.evaluation_objetives.view_evaluation_objetives.${key}`;
  }

  constructor(
    public performanceEvaluationService: PerformanceEvaluationService,
    public performanceEvalSharedService: PerformanceEvalSharedService,
  ) {
    this.subscriptions = this.performanceEvalSharedService
      .getViewEvaluationPerformanceData()
      .subscribe((result: any) => {
        this.EvaluacionPerView = result;
        this.qualifierDataView = result.qualifier;
        this.idEvaluation = result.perfomance_evaluation_id;
        document.getElementById('btn-viewEvaluationObjetives').click();
        document.getElementById('bodyGeneral').removeAttribute('style');

        this.performanceEvaluationService
          .getEvaluationObjetive(this.idEvaluation, this.status)
          .subscribe((table: any) => {
            if (table.data != null) {
              this.ObjectivesTableView = table;
              setTimeout(() => {
                this.objectReportEval.emit(this.ObjectivesTableView);
              }, 100);
            } else {
              this.ObjectivesTableView = [];
              setTimeout(() => {
                this.objectReportEval.emit({
                  success: true,
                  data: [],
                });
              }, 100);
            }
          });
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
