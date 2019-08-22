import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { EvaluationsService } from '../../../services/evaluations/evaluations.service';
import { EvaluationsSharedService } from '../../../services/shared/common/evaluations/evaluations-shared.service';
import { Evaluations } from '../../../models/common/evaluations/evaluations';
import { Angular2TokenService } from 'angular2-token';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-evaluated',
  templateUrl: './evaluated.component.html',
  styleUrls: ['./evaluated.component.css'],
})
export class EvaluatedComponent implements OnInit, OnDestroy {
  public evaluationsListPendind: Evaluations[] = [];
  public evaluationsListSubmitted: Evaluations[] = [];
  public token: boolean;
  private subscriptions: ISubscription[];

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  parseT(key) {
    return `pages.evaluations.evaluated.${key}`;
  }

  constructor(
    public evaluationService: EvaluationsService,
    public evaluationSharedService: EvaluationsSharedService,
    private tokenService: Angular2TokenService,
  ) {
    this.subscriptions = [
      this.tokenService.validateToken().subscribe(
        () => {
          this.token = false;
        },
        error => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString(),
          });
          document
            .getElementsByTagName('body')[0]
            .setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        },
      ),
      this.evaluationSharedService
        .getRefreshEvaluationData()
        .subscribe((refresh: any) => {
          if (refresh == true) {
            this.getDataEvaluation();
          }
        }),
    ];
    this.getDataEvaluation();
  }

  ngOnInit() {
  }

  getDataEvaluation() {
    this.subscriptions = [
      ...this.subscriptions,
      this.evaluationService.getEvaluationList().subscribe((res: any) => {
        setTimeout(() => {
          this.evaluationsListPendind = res.data[0].pendind;
          this.evaluationsListSubmitted = res.data[0].submitted;
        }, 100);
      }),
    ];
  }

  fillEvaluation(dataEval: any) {
    this.evaluationSharedService.setInfoEvaluation(dataEval.id);
  }

  seeEvaluation(viewData: any) {
    this.evaluationSharedService.setInfoViewEvaluation(viewData);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
