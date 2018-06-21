import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  objectForm: any[] = [];
  public questionModel: any;
  public showSubmit :boolean = true;



  constructor(public fb: FormBuilder) { }


  ngOnInit() {
    this.objectForm.push(
      {
        name_control: 'name',
        name_label: 'Nombre',
        value: 'Laura',
        option: [],
        control: 'label',
        type: 'text',
        required: true,
        order: 1,
        class_label: 'col-4 font-color-default text-left text-style',
        class_input: 'col-8 text-left',
        place_holder: ''
      },
      {
        name_control: 'lastName',
        name_label: 'Apellido',
        value: 'Beltran',
        option: [],
        control: 'label',
        type: 'text',
        required: true,
        order: 2,
        class_label: 'col-4 font-color-default text-left text-style',
        class_input: 'col-8 text-left',
        place_holder: ''
      },
      {
        name_control: 'phone',
        name_label: 'Telefono',
        value: '3205468565',
        option: [],
        control: 'input',
        type: 'number',
        required: true,
        order: 5,
        class_label: 'col-4 font-color-default text-left text-style',
        class_input: 'col-8 text-left',
        place_holder: 'prueba'
      },
      {
        name_control: 'gender',
        name_label: 'Genero',
        value: '3',
        options: [
          { id: 1, name: 'Masculino' },
          { id: 2, name: 'Femenino' },
          { id: 3, name: 'Masculino' },
        ],
        control: 'input',
        type: 'select',
        required: true,
        order: 6,
        class_label: 'col-4 font-color-default text-left text-style',
        class_input: 'col-8 text-left',
        place_holder: ''
      },
      {
        name_control: 'birthday',
        name_label: 'Fecha de Nacimiento',
        value: '20/06/2018',
        option: [],
        control: 'input',
        type: 'date',
        required: true,
        order: 3,
        class_label: 'col-4 font-color-default text-left text-style',
        class_input: 'col-8 text-left',
        place_holder: 'dd/mm/yyyy'
      },
      {
        name_control: 'hour',
        name_label: 'Hora',
        value: '03:00',
        option: [],
        control: 'input',
        type: 'time',
        required: true,
        order: 4,
        class_label: 'col-4 font-color-default text-left text-style',
        class_input: 'col-4 text-left',
        place_holder: 'HH:mm'
      },

    )

    this.form = this.createGroup();

    console.log(this.form)
  }

  createGroup() {
    const group = this.fb.group({});
    this.objectForm.forEach(control => group.addControl(control.name_control, this.fb.control(control.value)));
    return group;
  }

  function(form: any) {
    console.log(form)
  }

}
