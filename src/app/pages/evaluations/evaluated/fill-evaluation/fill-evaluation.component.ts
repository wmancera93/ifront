import { Component, OnInit, OnDestroy } from '@angular/core';
import { EvaluationsSharedService } from '../../../../services/shared/common/evaluations/evaluations-shared.service';
import { EvaluationsService } from '../../../../services/evaluations/evaluations.service';
import { Evaluations, Questions, ResponseEvaluation, Sections, MultipleAnswer } from '../../../../models/common/evaluations/evaluations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-fill-evaluation',
  templateUrl: './fill-evaluation.component.html',
  styleUrls: ['./fill-evaluation.component.css']
})
export class FillEvaluationComponent implements OnInit, OnDestroy {
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
  public totalQuestionsBySection: number = 0;
  public totalQuestions: number = 0;
  public countAfter: number = 0;
  public translate: Translate = null;

  constructor(public evaluationSharedService: EvaluationsSharedService,
    public evaluationService: EvaluationsService,
    private formBuilder: FormBuilder,
    public alert: AlertsService, public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate();
    document.getElementById("bodyGeneral").removeAttribute('style');
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'errorSendEvaluation') {
        document.getElementById("btn_fillEvaluation").click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }
    })
    this.evaluationSharedService.getInfoEvaluation().subscribe((info: number) => {
      if (this.countAfter === 0) {
        this.object = [];
        this.evaluationService.getDataEvaluationById(info).subscribe((list: any) => {
          this.idEvaluation = info;
          this.infoEvaluation = list.data;
          this.sections = list.data.sections_to_json;
          this.questions = list.data.questions_to_json;
        });
        document.getElementById('btn_fillEvaluation').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }

    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }

  onSubmitSendEval() {
    this.totalQuestions = 0;
    this.totalQuestionsBySection = null;
    if (this.sections.length !== 0) {
      this.sections.forEach(element => {
        this.totalQuestionsBySection = element.question_childrens_to_json.length;
        this.totalQuestions = this.totalQuestions + this.totalQuestionsBySection;
      });
    }
    else {
      this.totalQuestions = this.infoEvaluation.questions_to_json.length;
    }

    this.evaluationService.postDataEvaluation(this.object, this.totalQuestions).subscribe((data: any) => {
      if (data.success == true) {
        const alertConfirmation: Alerts[] = [{
          type: 'success',
          title: this.translate.app.frontEnd.pages.evaluation.evaluated.fill_evaluation.text_success_ts,
          message: data.message,
          confirmation: false,
        }];
        (<HTMLInputElement>document.getElementsByClassName('buttonCloseEvaluation')[0]).click();
        this.alert.setAlert(alertConfirmation[0]);
        this.showSubmit = true;
        this.refreshData = true;
        this.evaluationSharedService.setRefreshEvaluationData(this.refreshData);
        this.totalQuestions = 0;
      }
    },
      (error: any) => {
        const alertWarning: Alerts[] =
          [{
            type: 'danger',
            title: this.translate.app.frontEnd.pages.evaluation.evaluated.fill_evaluation.msg_deniedrequest_ts,
            message: error.json().errors.toString() + this.translate.app.frontEnd.pages.evaluation.evaluated.fill_evaluation.msg_continue_ts,
            confirmation: true,
            typeConfirmation: 'errorSendEvaluation'
          }];
        (<HTMLInputElement>document.getElementsByClassName('buttonCloseEvaluation')[0]).click();
        this.alert.setAlert(alertWarning[0]);
      })

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
