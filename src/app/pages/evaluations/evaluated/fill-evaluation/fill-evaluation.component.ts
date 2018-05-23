import { Component, OnInit } from '@angular/core';
import { EvaluationsSharedService } from '../../../../services/shared/common/evaluations/evaluations-shared.service';
import { EvaluationsService } from '../../../../services/evaluations/evaluations.service';
import { Evaluations, Questions } from '../../../../models/common/evaluations/evaluations';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fill-evaluation',
  templateUrl: './fill-evaluation.component.html',
  styleUrls: ['./fill-evaluation.component.css']
})
export class FillEvaluationComponent implements OnInit {
  public infoEvaluation: Evaluations;
  public questions: Questions[] = [];
  public showSubmit: boolean = true;
  public idQuestion: number;
  public radioData: any;
  public answerEvalForm: any;
  public indexData: number;

  public object: any[] = [];

  constructor(public evaluationSharedService: EvaluationsSharedService,
    public evaluationService: EvaluationsService,
    private formBuilder: FormBuilder) {

    this.evaluationSharedService.getInfoEvaluation().subscribe((info: any) => {
      //recibit id      
      this.evaluationService.getDataEvaluationById(1).subscribe((list: any) => {
        this.infoEvaluation = list.data;
        this.questions = list.data.questions;

      });
      document.getElementById('btn_fillEvaluation').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    });


    this.answerEvalForm = new FormGroup({});

  }

  ngOnInit() {
  }

  onSubmitSendEval(value) {

    console.log(value)
    //  let answers = new FormData();
    //  answers.append('id',value.id)
  }

  changeAnswer(idAnswer: any, idQuestion: any) {
    if (this.object.filter(data => data.question === idQuestion).length > 0) {
      this.object.splice(this.object.findIndex(obj => obj.question === idQuestion), 1);
    }
    this.object.push({ question: idQuestion, answer: idAnswer })

    console.log(this.object)

  }

}
