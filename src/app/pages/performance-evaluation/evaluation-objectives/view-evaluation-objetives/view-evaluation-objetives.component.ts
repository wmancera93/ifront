import { Component, OnInit, EventEmitter } from '@angular/core';
import { PerformanceEvaluationService } from '../../../../services/performance-evaluation/performance-evaluation.service';
import { PerformanceEvalSharedService } from '../../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { Qualifier } from '../../../../models/common/performance-evaluation/performance-evaluation';

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
  public nameReport: string = 'Objetivos de Evaluación'

  public objectReportEval: EventEmitter<any> = new EventEmitter();

  constructor(public performanceEvaluationService: PerformanceEvaluationService,
    public performanceEvalSharedService: PerformanceEvalSharedService) {

    this.performanceEvalSharedService.getViewEvaluationPerformanceData().subscribe((result: any) => {
    debugger
        this.EvaluacionPerView = result;
        this.qualifierDataView = result.qualifier;
        this.idEvaluation = result.id;
        document.getElementById('btn-viewEvaluationObjetives').click();
        document.getElementById('bodyGeneral').removeAttribute('style');

        this.performanceEvaluationService.getEvaluationObjetive(this.idEvaluation, this.status)
          .subscribe((table: any) => {
            this.ObjectivesTableView = table;
            setTimeout(() => {
              this.objectReportEval.emit(this.ObjectivesTableView);
            }, 50);
          })
      
    })

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
