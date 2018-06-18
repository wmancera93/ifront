import { Component, OnInit } from '@angular/core';
import { EvaluationsService } from '../../../services/evaluations/evaluations.service';
import { EvaluationsSharedService } from '../../../services/shared/common/evaluations/evaluations-shared.service';
import { Evaluations } from '../../../models/common/evaluations/evaluations';

@Component({
  selector: 'app-evaluated',
  templateUrl: './evaluated.component.html',
  styleUrls: ['./evaluated.component.css']
})
export class EvaluatedComponent implements OnInit {
  public evaluationsListPendind: Evaluations[] = [];
  public evaluationsListSubmitted: Evaluations[] = [];

  constructor(public evaluationService: EvaluationsService,
    public evaluationSharedService: EvaluationsSharedService) {
    this.getDataEvaluation();
    this.evaluationSharedService.getRefreshEvaluationData().subscribe((refresh: any) => {
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
