import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataMasterSharedService } from '../../../services/shared/common/data-master/data-master-shared.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  objectForm: any[] = null;
  public questionModel: any;
  public showSubmit: boolean = true;
  public showForm: boolean = false;
  public id: any;
  public name: any;
  public idEdit: any[] = [];
  public objectEditBlur: any[] = [];
  public edit: boolean = false;
  public generalObject: any[] = [];
  public staticGeneralObject: any[] = [];

  constructor(public fb: FormBuilder,
    public dataMasterSharedService: DataMasterSharedService,
    public alert: AlertsService) {
    this.dataMasterSharedService.getDataFormDynamic().subscribe((data: any) => {
      this.generalObject = data.data;

      this.staticGeneralObject = [];

      if (this.generalObject.length > 0) {
        data.data[0].forEach(element => {
          this.staticGeneralObject.push({
            id_static: element.id,
            options_static: element.option,
            validate_requisite: element.is_prerequisite,
            id_requesite: element.prerequisite_id
          })
        });


         console.log(this.staticGeneralObject)
        // debugger
        // setTimeout(() => {
        //   this.staticGeneralObject.filter(data => data.validate_requisite.toString() === 'true').forEach(element => {
        //     let newOptions = element.options_static.filter(option => option.filtrer === this.generalObject[0].filter(objectFilter => objectFilter.id === element.id_requesite)[0].value);
        //     this.generalObject[0].filter(objectFilter => objectFilter.id === element.id_static)[0].option = newOptions;
        //   });
    
          console.log(this.generalObject[0])
        // }, 400);
       
      }

     

      if (this.generalObject !== null && this.generalObject !== undefined) {
        this.edit = data.edit;
        this.code = data.code;
        this.form = new FormGroup({});
        this.form = this.createGroup();
        this.showForm = true;
      }

    })
  }
  ngOnInit() {

  }
  createGroup() {
    this.objectForm = [];
    const group = this.fb.group({});
    this.generalObject.forEach(element => {
      element.forEach(control => {
        group.addControl(control.id, this.fb.control(control.value.toString().split(',').join('.')))
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
    let objectForm: any[] = [];
    let recorrer = JSON.stringify(form).split('"').join('').replace('{', '').replace('}', '').split(':').toString().split(',');
    for (let index = 0; index < recorrer.length; index++) {
      if (((index / 2) % 1) === 0) {
        this.idSend = recorrer[index];
      }
      else {
        this.valueSend = recorrer[index];
        objectForm.push({
          id: this.idSend,
          value_to_change: this.valueSend
        })
      }
    }
    let objectSend: any[] = [];
    objectForm.forEach(data => {
      this.objectEditBlur.forEach(element => {
        if (data.id.toString() === element.id.toString()) {
          if (data.value_to_change.toString() !== element.value.toString()) {
            objectSend.push({
              id: data.id,
              value_to_change: data.value_to_change,
              master_data_type: this.code,
              count: 0
            })
          }
        }
      });
    })
    this.dataMasterSharedService.setReturnDataFormDynamic(objectSend);
    this.idSend = "";
    this.valueSend = "";
    this.code = "";
  }
  detectChange(params: any, form) {
    if (this.objectEditBlur.filter(categoryFilter => categoryFilter.id === params.id).length > 0) {
      this.objectEditBlur.splice(this.objectEditBlur.findIndex(categoryFilter => categoryFilter.id === params.id), 1);
    }
    this.objectEditBlur.push(params);

    this.staticGeneralObject.filter(data => data.validate_requisite.toString() === 'true').forEach(element => {
      if (element.id_requesite === params.id) {
        let objectForm: any[] = [];
        let recorrer = JSON.stringify(form).split('"').join('').replace('{', '').replace('}', '').split(':').toString().split(',');

        for (let index = 0; index < recorrer.length; index++) {
          if (((index / 2) % 1) === 0) {
            this.idSend = recorrer[index];
          }
          else {
            this.valueSend = recorrer[index];
            objectForm.push({
              id: this.idSend,
              value_to_change: this.valueSend,
            })
          }
        }
        let newOptions = element.options_static.filter(option => option.filtrer === objectForm.filter(objectFilter => objectFilter.id === params.id.toString())[0].value_to_change);
        this.generalObject[0].filter(objectFilter => objectFilter.id === element.id_static)[0].option = newOptions;
      }
    });
    document.getElementById("savebutton").removeAttribute('disabled');
  }

  kewUptext(value) {
    let out = '';
    let filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890 #-.;@';
    for (let i = 0; i < value.currentTarget.value.length; i++) {
      if (filtro.indexOf(value.currentTarget.value.charAt(i)) != -1) {
        out += value.currentTarget.value.charAt(i);
      } else {
        if (value.key === ',') {
          out += '.';
        }
      }
    }
    value.currentTarget.value = out
  }

}
