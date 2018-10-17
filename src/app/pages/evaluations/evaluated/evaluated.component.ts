import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EvaluationsService } from '../../../services/evaluations/evaluations.service';
import { EvaluationsSharedService } from '../../../services/shared/common/evaluations/evaluations-shared.service';
import { Evaluations } from '../../../models/common/evaluations/evaluations';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-evaluated',
  templateUrl: './evaluated.component.html',
  styleUrls: ['./evaluated.component.css']
})
export class EvaluatedComponent implements OnInit {
  public evaluationsListPendind: Evaluations[] = [];
  public evaluationsListSubmitted: Evaluations[] = [];
  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public evaluationService: EvaluationsService,
    public evaluationSharedService: EvaluationsSharedService,
    private tokenService: Angular2TokenService) {

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })
    this.getDataEvaluation();
    this.evaluationSharedService.getRefreshEvaluationData().subscribe((refresh: any) => {
      debugger
      if (refresh == true) {
        this.getDataEvaluation();
      }
    })
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });


  }

  getDataEvaluation() {
    this.evaluationService.getEvaluationList().subscribe((res: any) => {
      setTimeout(() => {
        this.evaluationsListPendind = res.data[0].pendind;
        this.evaluationsListSubmitted = res.data[0].submitted;
      }, 100);
    })
  }

  fillEvaluation(dataEval: any) {
    this.evaluationSharedService.setInfoEvaluation(dataEval.id);
  }

  seeEvaluation(viewData: any) {
    this.evaluationSharedService.setInfoViewEvaluation(viewData);
  }

}
