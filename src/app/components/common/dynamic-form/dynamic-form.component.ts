import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextboxQuestion, DropDownQuestion } from '../../../models/common/dynamic-form/dynamic-form';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  questions = [];
  public questionModel: any;

  toGroup() {
    let group: any = {};
    this.questions.forEach((question) => {
      if (question.required) {
        group[question.key] = new FormControl('', Validators.required);
      }
      else {
        group[question.key] = new FormControl('');
      }
    });
    return new FormGroup(group);
  }

  constructor() {
    let question = new TextboxQuestion();
    question.key = 'emailAddress';
    question.text = 'Email';
    question.required = false;
    question.type = 'email';
    question.order = 3;
    // this.questionModel.questions.push(question);
  

    let ddQuestion = new DropDownQuestion();
    ddQuestion.key = 'country';
    ddQuestion.text = 'Country';
    ddQuestion.options.push({ key: 'usa', value: 'USA' });
    ddQuestion.options.push({ key: 'germany', value: 'Germany' });
    ddQuestion.options.push({ key: 'canada', value: 'Canada' });
    ddQuestion.options.push({ key: 'australia', value: 'Australia' });
    ddQuestion.order = 4;
    this.questionModel.questions.push(ddQuestion);

    this.questionModel.questions.sort((a, b) => a.order - b.order);
  }

  ngOnInit() {

  }

}
