import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataMasterSharedService } from '../../../services/shared/common/data-master/data-master-shared.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  objectForm: any[] = null;
  public questionModel: any;
  public showSubmit = true;
  public showForm = false;
  public id: any;
  public name: any;
  public idEdit: any[] = [];
  public objectEditBlur: any[] = [];
  public edit = false;
  public generalObject: any[] = [];
  public staticGeneralObject: any[] = [];
  public countAfter = 0;
  public codeStatic = -1;
  public codeObject = 0;


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.dynamic_form.${key}`;
  }

  constructor(public fb: FormBuilder, public dataMasterSharedService: DataMasterSharedService, public alert: AlertsService) {
    this.dataMasterSharedService.getDataFormDynamic().subscribe((data: any) => {
      this.codeObject = data.code;
      if (this.countAfter === 0) {
        if (data.code !== this.codeStatic) {
          this.codeStatic = data.code;
          this.staticGeneralObject = [];
        }

        this.generalObject = data.data;
        if (data.edit) {
          if (this.staticGeneralObject.length === 0) {
            if (this.generalObject.length > 0) {
              data.data.forEach(index => {
                index.forEach(element => {
                  if (element.type === 'date' && element.control === 'input') {
                    const split = element.value.split('/');
                    if (split.length > 1) {
                      element.value = split[2] + '-' + split[1] + '-' + split[0];
                    }
                  }

                  this.staticGeneralObject.push({
                    id_static: element.id,
                    options_static: element.option,
                    validate_requisite: element.is_prerequisite,
                    id_requesite: element.prerequisite_id,
                  });
                });
              });
            }
          }

          if (this.staticGeneralObject.length > 0) {
            this.generalObject.forEach(object => {
              object
                .filter(data => data.is_prerequisite.toString() === 'true')
                .forEach(change => {
                  let newOptions;
                  if (change.prerequisite_id !== null) {
                    newOptions = this.staticGeneralObject
                      .filter(staticObject => staticObject.id_static === change.id)[0]
                      .options_static.filter(
                        select =>
                          select.filter ===
                          object.filter(objectFilter => objectFilter.id.toString() === change.prerequisite_id.toString())[0]
                            .value,
                      );
                  } else {
                    newOptions = [{ code: '', description: '' }];
                  }

                  change.option = newOptions;
                });
            });
          }
        }

        if (this.generalObject !== null && this.generalObject !== undefined) {
          this.edit = data.edit;
          this.code = data.code;
          this.form = new FormGroup({});
          this.form = this.createGroup();
          this.showForm = true;
        }
      }
    });
  }
  ngOnInit() {}
  createGroup() {
    this.objectForm = [];
    const group = this.fb.group({});
    this.generalObject.forEach(element => {
      element.forEach(control => {
        group.addControl(
          control.id,
          this.fb.control(
            control.value
              .toString()
              .split(',')
              .join('.'),
          ),
        );
      });
      this.objectForm.push(element);
      if (this.generalObject.length <= 1) {
        setTimeout(() => {
          document.getElementById('border-general').classList.remove('border-array');
        }, 100);
      }
    });
    return group;
  }
  public idSend;
  public valueSend;
  public code;
  sendDynamicForm(form) {
    const objectForm: any[] = [];
    const recorrer = JSON.stringify(form)
      .split('"')
      .join('')
      .replace('{', '')
      .replace('}', '')
      .split(':')
      .toString()
      .split(',');
    for (let index = 0; index < recorrer.length; index++) {
      if ((index / 2) % 1 === 0) {
        this.idSend = recorrer[index];
      } else {
        this.valueSend = recorrer[index];
        objectForm.push({
          id: this.idSend,
          value_to_change: this.valueSend,
        });
      }
    }
    const objectSend: any[] = [];
    objectForm.forEach(data => {
      this.objectEditBlur.forEach(element => {
        if (data.id.toString() === element.id.toString()) {
          if (data.value_to_change.toString() !== element.value.toString()) {
            objectSend.push({
              id: data.id,
              value_to_change: data.value_to_change,
              master_data_type: this.code,
              count: 0,
            });
          }
        }
      });
    });
    this.dataMasterSharedService.setReturnDataFormDynamic(objectSend);
    this.idSend = '';
    this.valueSend = '';
    this.code = '';
  }
  detectChange(params: any, form) {
    if (this.objectEditBlur.filter(categoryFilter => categoryFilter.id === params.id).length > 0) {
      this.objectEditBlur.splice(this.objectEditBlur.findIndex(categoryFilter => categoryFilter.id === params.id), 1);
    }
    this.objectEditBlur.push(params);
    this.staticGeneralObject
      .filter(data => data.validate_requisite.toString() === 'true')
      .forEach(element => {
        if (element.id_requesite === params.id) {
          const objectForm: any[] = [];
          const recorrer = JSON.stringify(form)
            .split('"')
            .join('')
            .replace('{', '')
            .replace('}', '')
            .split(':')
            .toString()
            .split(',');
          for (let index = 0; index < recorrer.length; index++) {
            if ((index / 2) % 1 === 0) {
              this.idSend = recorrer[index];
            } else {
              this.valueSend = recorrer[index];
              objectForm.push({
                id: this.idSend,
                value_to_change: this.valueSend,
              });
            }
          }
          let newOptions;
          if (element.prerequisite_id !== null) {
            newOptions = element.options_static.filter(
              option =>
                option.filter ===
                objectForm.filter(objectFilter => objectFilter.id.toString() === params.id.toString())[0].value_to_change,
            );
          } else {
            newOptions = [{ code: '', description: '' }];
          }
          this.generalObject.forEach(object => {
            object.forEach(change => {
              if (change.id === element.id_static) {
                change.option = newOptions;
              }
            });
          });
        }
      });
    document.getElementById('savebutton').removeAttribute('disabled');
  }
  kewUptext(value) {
    let out = '';
    const filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890 #-.;@';
    for (let i = 0; i < value.currentTarget.value.length; i++) {
      if (filtro.indexOf(value.currentTarget.value.charAt(i)) != -1) {
        out += value.currentTarget.value.charAt(i);
      } else {
        if (value.key === ',') {
          out += '.';
        }
      }
    }
    value.currentTarget.value = out;
  }

  ngOnDestroy() {
    this.countAfter += 1;
    this.staticGeneralObject = [];
  }
}
