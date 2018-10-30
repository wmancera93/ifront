import { Component, OnInit, EventEmitter } from '@angular/core';
import { PerformanceEvaluationService } from '../../../services/performance-evaluation/performance-evaluation.service';
import { PerformanceEvalSharedService } from '../../../services/shared/common/performance-evaluation/performance-eval-shared.service';

@Component({
  selector: 'app-evaluation-objectives',
  templateUrl: './evaluation-objectives.component.html',
  styleUrls: ['./evaluation-objectives.component.css']
})
export class EvaluationObjectivesComponent implements OnInit {

  public evaluationPerformanceList: any[] = [];
  public objectReport: EventEmitter<any> = new EventEmitter();
  token = false;

  constructor(public performanceEvaluationService: PerformanceEvaluationService,
    public performanceEvalSharedService: PerformanceEvalSharedService) {

    this.performanceEvalSharedService.getRefrehsEval().subscribe((data: any) => {
      if (data) {
        this.performanceEvaluationService.getPerformanceEvaluations().subscribe((data: any) => {
          this.evaluationPerformanceList = data.data;
        });
      }
    })

  }

  ngOnInit() {
    this.performanceEvaluationService.getPerformanceEvaluations().subscribe((data: any) => {
      this.evaluationPerformanceList = data.data;
    });
  }

  goToModalEval(infoEval: any) {
    this.performanceEvalSharedService.setEvaluationPerformanceData(infoEval);
  }

  goToViewEval(editEval: any) {
    this.performanceEvaluationService.getViewEvaluationPDF(editEval.id).subscribe((data: any) => {
      window.open(data.data.result_pdf.url);
    })
  }
  goToModalEvalView(viewEval: any) {
    this.performanceEvalSharedService.setViewEvaluationPerformanceData(viewEval);
  }


}
