import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataMasterSharedService } from '../../../services/shared/common/data-master/data-master-shared.service';

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


  constructor(public fb: FormBuilder,
    public dataMasterSharedService: DataMasterSharedService) {
    this.dataMasterSharedService.getDataFormDynamic().subscribe((data: any) => {
      this.objectForm = data.data;
      if (this.objectForm !== null && this.objectForm !== undefined) {
        this.edit = data.edit;
        this.form = new FormGroup({});
        this.form = this.createGroup();
        this.showForm = true;
      }


    })
  }

  ngOnInit() {


  }

  createGroup() {
    const group = this.fb.group({});

    this.objectForm.forEach(control => group.addControl(control.id, this.fb.control(control.value)));

    return group;
  }
  public idSend;
  public valueSend;

  sendDynamicForm(form) {
    console.log(form)
    // form.forEach(element => {
      
    // });
debugger
    let objectForm: any[] = [];
    let recorrer = JSON.stringify(form).split(':').toString().replace('{', '').replace('}', '').split('"').toString().split(",,,").toString().split(",,").toString().substring(1, JSON.stringify(form).split(':').toString().replace('{', '').replace('}', '').split('"').toString().split(",,,").toString().split(",,").toString().length - 1).split(',')
    console.log(recorrer)
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
      debugger
      this.objectEditBlur.forEach(element => {
        if (data.id.toString() === element.id.toString()) {
          if (data.value_to_change.toString() !== element.value.toString()) {
            objectSend.push({
              id: data.id,
              value_to_change: data.value_to_change
            })
          }

        }
      });
    })
    this.dataMasterSharedService.setReturnDataFormDynamic(objectSend);
    this.idSend = "";
    this.valueSend = "";
  }

  detectChange(params: any) {

    if (this.objectEditBlur.filter(categoryFilter => categoryFilter.id === params.id).length > 0) {
      this.objectEditBlur.splice(this.objectEditBlur.findIndex(categoryFilter => categoryFilter.id === params.id), 1);
    }
    this.objectEditBlur.push(params);
    document.getElementById("savebutton").removeAttribute('disabled');
  }



}
