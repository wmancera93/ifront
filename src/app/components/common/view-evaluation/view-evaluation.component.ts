import { Component, OnInit } from '@angular/core';
import { EvaluationsSharedService } from '../../../services/shared/common/evaluations/evaluations-shared.service';
import { EvaluationsService } from '../../../services/evaluations/evaluations.service';
import { Evaluations } from '../../../models/common/evaluations/evaluations';

@Component({
  selector: 'app-view-evaluation',
  templateUrl: './view-evaluation.component.html',
  styleUrls: ['./view-evaluation.component.css']
})
export class ViewEvaluationComponent implements OnInit {
  public viewEvaluation : Evaluations;

  constructor(public evaluationSharedService: EvaluationsSharedService,
    public evaluationService: EvaluationsService) { 
      this.evaluationSharedService.getInfoViewEvaluation().subscribe((info:any)=>{
        this.viewEvaluation = info;
        console.log(info)
        document.getElementById('btn_fillEvaluation').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      })
    }

  ngOnInit() {
  }

}
