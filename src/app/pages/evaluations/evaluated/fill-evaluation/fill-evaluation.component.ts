import { Component, OnInit } from '@angular/core';
import { EvaluationsSharedService } from '../../../../services/shared/common/evaluations/evaluations-shared.service';
import { EvaluationsService } from '../../../../services/evaluations/evaluations.service';
import { Evaluations, Questions } from '../../../../models/common/evaluations/evaluations';

@Component({
  selector: 'app-fill-evaluation',
  templateUrl: './fill-evaluation.component.html',
  styleUrls: ['./fill-evaluation.component.css']
})
export class FillEvaluationComponent implements OnInit {
  public infoEvaluation: Evaluations;
  public questions : Questions;

  constructor(public evaluationSharedService: EvaluationsSharedService,
    public evaluationService: EvaluationsService) {

    this.evaluationSharedService.getInfoEvaluation().subscribe((info: any) => {     
      //recibit id      
      this.evaluationService.getDataEvaluationById(1).subscribe((list:any)=>{
        this.infoEvaluation = list.data;
        this.questions = list.data.questions;
        console.log(this.questions);
      });
      document.getElementById('btn_fillEvaluation').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    })
  }

  ngOnInit() {

  }

}
