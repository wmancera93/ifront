import { Component, OnInit, EventEmitter } from '@angular/core';
import { PerformanceEvaluationService } from '../../../services/performance-evaluation/performance-evaluation.service';
import { PerformanceEvalSharedService } from '../../../services/shared/common/performance-evaluation/performance-eval-shared.service';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-evaluation-objectives',
  templateUrl: './evaluation-objectives.component.html',
  styleUrls: ['./evaluation-objectives.component.css'],
})
export class EvaluationObjectivesComponent implements OnInit {
  public evaluationPerformanceList: any[] = [];
  public objectReport: EventEmitter<any> = new EventEmitter();
  token = false;
  private subscriptions: ISubscription[] = [];
  public steps = ['step_1', 'step_2', 'step_3', 'step_4', 'step_5'];

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.performance_evaluation.evaluation_objetives.${key}`;
  }

  constructor(
    public performanceEvaluationService: PerformanceEvaluationService,
    public performanceEvalSharedService: PerformanceEvalSharedService,
    public joyrideAppService: JoyrideAppService,
  ) {
    this.subscriptions.push(
      this.performanceEvalSharedService.getRefrehsEval().subscribe((res: any) => {
        if (res) {
          this.subscriptions.push(
            this.performanceEvaluationService.getPerformanceEvaluations().subscribe((data: any) => {
              this.evaluationPerformanceList = data.data;
            }),
          );
        }
      }),
    );
    this.subscriptions.push(
      joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(joyrideAppService.startTour({ steps: this.steps, startWith: 'step_7' }).subscribe(() => {}));
      }),
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.performanceEvaluationService.getPerformanceEvaluations().subscribe((data: any) => {
        this.evaluationPerformanceList = data.data;
      }),
    );
  }

  goToModalEval(infoEval: any) {
    this.performanceEvalSharedService.setEvaluationPerformanceData(infoEval);
  }

  goToViewEval(editEval: any) {
    this.subscriptions.push(
      this.performanceEvaluationService.getViewEvaluationPDF(editEval.id).subscribe((data: any) => {
        window.open(data.data.file_pdf.url);
      }),
    );
  }
  goToModalEvalView(viewEval: any) {
    this.performanceEvalSharedService.setViewEvaluationPerformanceData(viewEval);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
