import { Component, OnInit } from '@angular/core';
import { EvaluationsSharedService } from '../../../../services/shared/common/evaluations/evaluations-shared.service';
import { EvaluationsService } from '../../../../services/evaluations/evaluations.service';
import { Evaluations, Questions, ResponseAnswer, ResponseEvaluation } from '../../../../models/common/evaluations/evaluations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';

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
  public comment: string;
  public dataQuestions: ResponseEvaluation;
  public object: ResponseAnswer[] = [];
  public idEvaluation: number;
  public refreshData: boolean = false;

  constructor(public evaluationSharedService: EvaluationsSharedService,
    public evaluationService: EvaluationsService,
    private formBuilder: FormBuilder,
    public alert: AlertsService) {
    this.evaluationSharedService.getInfoEvaluation().subscribe((info: number) => {
      this.evaluationService.getDataEvaluationById(info).subscribe((list: any) => {
        this.idEvaluation = info;
        this.infoEvaluation = list.data;
        this.questions = list.data.questions;

      });
      document.getElementById('btn_fillEvaluation').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    });


  }

  ngOnInit() {
  }

  onSubmitSendEval() {
    this.dataQuestions = { evaluation_id: this.idEvaluation, answers: this.object };
    this.showSubmit = false;
    this.evaluationService.postDataEvaluation(this.dataQuestions).subscribe((data: any) => {
      if (data.success == true) {
        (<HTMLInputElement>document.getElementsByClassName('buttonCloseEvaluation')[0]).click();
        const alertConfirmation: Alerts[] = [{ type: 'success', title: 'Estado de la evaluación', message: data.message }];
        this.alert.setAlert(alertConfirmation[0]);
        this.showSubmit = true;
        this.refreshData = true;
        this.evaluationSharedService.setRefreshEvaluationData(this.refreshData);
      }
    })

  }

  changeAnswer(idAnswer: any, idQuestion: any) {
    if (this.object.filter(data => data.question_id === idQuestion).length > 0) {
      this.object.splice(this.object.findIndex(obj => obj.question_id === idQuestion), 1);
    }
    this.object.push({ question_id: idQuestion, answer_id: idAnswer, comments: (<HTMLInputElement>document.getElementById(idQuestion + 'commentAnswer')).value })

  }

  detectComment(question_id: any) {

    if (this.object.filter(data => data.question_id === question_id).length > 0) {
      this.object.filter(data => data.question_id === question_id)[0].comments = (<HTMLInputElement>document.getElementById(question_id + 'commentAnswer')).value;

    }
    else {
      this.object.push({ question_id: question_id, comments: (<HTMLInputElement>document.getElementById(question_id + 'commentAnswer')).value })
    }
  }


}
