import { Component, OnInit, EventEmitter } from '@angular/core';
import { PerformanceEvaluationService } from '../../../../services/performance-evaluation/performance-evaluation.service';
import { PerformanceEvalSharedService } from '../../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { Qualifier } from '../../../../models/common/performance-evaluation/performance-evaluation';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-view-evaluation-objetives',
  templateUrl: './view-evaluation-objetives.component.html',
  styleUrls: ['./view-evaluation-objetives.component.css']
})
export class ViewEvaluationObjetivesComponent implements OnInit {

  public countAfter: number = 0;
  public EvaluacionPerView: any = null;
  public qualifierDataView: Qualifier[] = [];
  public idEvaluation: string;
  public status: boolean = false;
  public ObjectivesTableView: any[] = [];
  public nameReport: string;
  public translate: Translate = null;
  public objectReportEval: EventEmitter<any> = new EventEmitter();

  constructor(public performanceEvaluationService: PerformanceEvaluationService,
    public performanceEvalSharedService: PerformanceEvalSharedService, public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate();
    this.nameReport = this.translate.app.frontEnd.pages.performance_evaluation.evaluation_objetives.view_evaluation_objetives.name_table_ts;
    this.performanceEvalSharedService.getViewEvaluationPerformanceData().subscribe((result: any) => {
      debugger
      this.EvaluacionPerView = result;
      this.qualifierDataView = result.qualifier;
      this.idEvaluation = result.perfomance_evaluation_id;
      document.getElementById('btn-viewEvaluationObjetives').click();
      document.getElementById('bodyGeneral').removeAttribute('style');

      this.performanceEvaluationService.getEvaluationObjetive(this.idEvaluation, this.status)
        .subscribe((table: any) => {
          if (table.data != null) {
            this.ObjectivesTableView = table;
            setTimeout(() => {
              this.objectReportEval.emit(this.ObjectivesTableView);
            }, 100);
          } else {
            this.ObjectivesTableView = [];
            setTimeout(() => {
              this.objectReportEval.emit({ success: true, data: [] });
            }, 100);
          }

        })

    })

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
