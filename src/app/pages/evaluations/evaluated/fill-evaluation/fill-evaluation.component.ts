import { Component, OnInit } from '@angular/core';
import { EvaluationsSharedService } from '../../../../services/shared/common/evaluations/evaluations-shared.service';
import { EvaluationsService } from '../../../../services/evaluations/evaluations.service';
import { Evaluations, Questions, ResponseEvaluation, Sections, MultipleAnswer } from '../../../../models/common/evaluations/evaluations';
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
  public questionsChildren: Questions[] = [];
  public sections: Sections[] = [];
  public showSubmit: boolean = true;
  public idQuestion: number;
  public radioData: any;
  public answerEvalForm: any;
  public indexData: number;
  public comment: string;
  public dataQuestions: ResponseEvaluation[] = [];
  public object: ResponseEvaluation[] = [];
  public idEvaluation: number;
  public refreshData: boolean = false;
  public multipleAnswer: MultipleAnswer[] = [];
  public objectBySection: any[] = [];

  constructor(public evaluationSharedService: EvaluationsSharedService,
    public evaluationService: EvaluationsService,
    private formBuilder: FormBuilder,
    public alert: AlertsService) {
    this.evaluationSharedService.getInfoEvaluation().subscribe((info: number) => {
      this.evaluationService.getDataEvaluationById(info).subscribe((list: any) => {
        this.idEvaluation = info;
        this.infoEvaluation = list.data;
        this.sections = list.data.sections_to_json;
        this.questions = list.data.questions_to_json;
      });
      document.getElementById('btn_fillEvaluation').click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    });
  }

  ngOnInit() {
  }

  onSubmitSendEval() {
    console.log(this.object)
    // this.evaluationService.postDataEvaluation(this.dataQuestions).subscribe((data: any) => {
    //   if (data.success == true) {
    //     (<HTMLInputElement>document.getElementsByClassName('buttonCloseEvaluation')[0]).click();
    //     const alertConfirmation: Alerts[] = [{ type: 'success', title: 'Estado de la evaluación', message: data.message }];
    //     this.alert.setAlert(alertConfirmation[0]);
    //     this.showSubmit = true;
    //     this.refreshData = true;
    //     this.evaluationSharedService.setRefreshEvaluationData(this.refreshData);
    //   }
    // })

  }

  changeAnswer(idAnswer: any, idQuestion: any, type_question: string, parent_section: number, section?: Sections) {
    switch (type_question) {
      case "unique":
        if (this.object.filter(data => data.question_id === idQuestion).length > 0) {

          this.object.splice(this.object.findIndex(obj => obj.question_id === idQuestion), 1);
        }
        this.object.push({
          section_id: section == null ? null : section.id,
          question_id: idQuestion,
          answer_id: idAnswer,
          comments: (<HTMLInputElement>document.getElementById(idQuestion + 'commentAnswer')).value,
          parent_id: parent_section,
          evaluation_id: this.idEvaluation,
          question_type: type_question
        });

        break;
      case "multiple":
        let _question = this.object.filter(data => data.question_id === idQuestion);

        if (_question.length > 0) {

          let _answer = _question[0].answers.filter((data: any) => data.answer_id === idAnswer);

          if (_answer.length > 0) {
            _question[0].answers.splice(_question[0].answers.findIndex(obj => obj.answer_id === idAnswer), 1);
            if (_question[0].answers.length === 0) {
              this.object.splice(this.object.findIndex(obj => obj.question_id === idQuestion), 1)
            }
          } else {
            _question[0].answers.push({ answer_id: idAnswer });
          }

        } else {
          this.object.push({
            section_id: section == null ? null : section.id,
            question_id: idQuestion,
            answers: [{ answer_id: idAnswer }],
            comments: (<HTMLInputElement>document.getElementById(idQuestion + 'commentAnswer')).value,
            parent_id: parent_section,
            evaluation_id: this.idEvaluation,
            question_type: type_question
          })
        }

        break;

      default:
        break;
    }

  }

  detectComment(question_id: any, parent_section: number, section?: Sections) {
    if (this.object.filter(data => data.question_id === question_id).length > 0) {
      this.object.filter(data => data.question_id === question_id)[0].comments = (<HTMLInputElement>document.getElementById(question_id + 'commentAnswer')).value;

    }
    else {
      this.object.push({
        section_id: section == null ? null : section.id,
        question_id: question_id,
        comments: (<HTMLInputElement>document.getElementById(question_id + 'commentAnswer')).value,
        parent_id: parent_section,
        evaluation_id: this.idEvaluation,
        question_type: ""
      })
    }
  }
  detectResponse(question_id: any, parent_section: number, section?: Sections) {
    if (this.object.filter(data => data.question_id === question_id).length > 0) {
      this.object.filter(data => data.question_id === question_id)[0].comments = (<HTMLInputElement>document.getElementById(question_id + 'commentAnswer')).value;
    }
    else {
      this.object.push({
        section_id: section == null ? null : section.id,
        question_id: question_id,
        openAnswer: (<HTMLInputElement>document.getElementById(question_id + 'openResponse')).value,
        comments: "",
        parent_id: parent_section,
        evaluation_id: this.idEvaluation,
        question_type: "open"
      });
    }
  }


}
