import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-requests-rh',
  templateUrl: './requests-rh.component.html',
  styleUrls: ['./requests-rh.component.css']
})
export class RequestsRhComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
  }

  form = new FormGroup({});
  model = { email: 'email@gmail.com', name: '', lastname: '', image: '' };
  fields: FormlyFieldConfig[] = [{
    key: 'email',
    type: 'input',
    templateOptions: {
      type: 'email',
      label: 'Email address',
      placeholder: 'Enter email',
      required: true,
    }
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      type: 'text',
      label: 'test',
      placeholder: 'Enter name',
      required: true,
    }
  },
  {
    key: 'lastname',
    type: 'input',
    templateOptions: {
      type: 'text',
      label: 'test',
      placeholder: 'Enter name',
      required: true,
    }
  },
  {
    key: 'image',
    type: 'input',
    templateOptions: {
      type: 'file',
      label: 'file expample',
      placeholder: 'Enter file',
      required: true,
    }
  }];

  submit(model) {
    console.log(model);
  }

}
