import { Component, OnInit, EventEmitter } from '@angular/core';
import { PerformanceEvaluationService } from '../../../../services/performance-evaluation/performance-evaluation.service';
import { PerformanceEvaluation } from '../../../../models/common/performance-evaluation/performance-evaluation';
import { TablesPermisions } from '../../../../models/common/tables/tables';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit-evaluation-objetives',
  templateUrl: './edit-evaluation-objetives.component.html',
  styleUrls: ['./edit-evaluation-objetives.component.css']
})
export class EditEvaluationObjetivesComponent implements OnInit {

  public IdEvaluation: string = "2";
  public EvaluacionPer: PerformanceEvaluation[] = [];
  public namecomplete: string = "";
  public ObjectivesTable: any[] = [];
  public bedit: boolean;
  public newId: number;
  public showSubmit = true;
  public formObjetive: any;
  public idEdit:number;

  public nameReport: string = 'Objetivos de Evaluación'

  public objectReport: EventEmitter<any> = new EventEmitter();

  constructor(public performanceEvaluationService: PerformanceEvaluationService,private fb: FormBuilder) {

    this.formObjetive= new FormGroup({});
    this.formObjetive = fb.group({
      start_date:'',
      end_date:'',
      weight:'',
     objetive_text:'',
    });

    this.EvaluacionPer.push({
      id: 2,
      code: "01",
      name: "Evaluacion de desempeño",
      status_name: "Planificado",
      status_code: "2",
      created_date: "04-07-2018 16:28:11",
      updated_date: "04-07-2018 16:28:11",
      start_evaluation_date: "01-01-2018",
      end_evaluation_date: "01-12-2018",
      start_excecution_date: "01-01-2018",
      end_excecution_date: "28-02-2018",
      target_dat: "01-02-2018",
      qualifier: {
        id: 5703,
        name: "Laura",
        lastname: "Beltran Silvina",
        phone: "",
        pernr: 2717,
        image: {
          url: "../../../../../assets/themes/patterns/icon-user-negative.png"
        },
        unidad_org: "DIRECCION MARKETING Y COMUNICACIONES",
        area: "Gerencial",
        division_per: "Demo Interactive",
        subdivision_per: "Administrativos",
        name_complete: "Laura  Beltran Silvina",
        personal_phone: "3232143",
        short_name: "Laura Beltran silvina",
        personal_code: 2717,
        position: "DIRECTOR DE MARKETING Y COMUNICACIONES",
        get_user_of_email: "@juan.contreras",
        get_domain_of_email: "@hrinteractive.co"
      },
    });

    this.namecomplete = this.EvaluacionPer[0].qualifier.name + ' ' + this.EvaluacionPer[0].qualifier.lastname;

    this.ObjectivesTable.push({
      success: true,
      data: [{
        title: "Objetivos de Evaluación. Laura Beltran silvina",
        title_table: "Objetivos de Evaluación. Laura Beltran silvina",
        labels: {
          field_0: {
            value: "Id",
            type: "string",
            sortable: false,
          },
          field_1: {
            value: "Descripción de Objetivo",
            type: "string",
            sortable: false,
          },
          field_2: {
            value: "Inicia",
            type: "string",
            sortable: false,
          },

          field_3: {
            value: "Finaliza",
            type: "string",
            sortable: false,
          },
          field_4: {
            value: "Valor Importancia",
            type: "string",
            sortable: false,
          },
          field_5: {
            value: "Editar",
            type: "string",
            sortable: false,
          },
          field_6: {
            value: "Eliminar",
            type: "string",
            sortable: false,
          }
        },
        data: [
          {
            id: 1,
            field_0: 1,
            field_1: "Objetivo de evaluacion 1",
            field_2: "2018-02-28",
            field_3: "2018-02-28",
            field_4: "20.0 %",
            field_5: {
              type_method: "UPDATE",
              type_element: "button",
              icon: "fa-pencil",
              id: 1,
              title: "Editar",
              action_method: "updateEvaluationObjetive",
              disable: false
            },
            field_6: {
              type_method: "DELETE",
              type_element: "button",
              icon: "fa-trash",
              id: 1,
              title: "Eliminar",
              action_method: "deleteEvaluationObjetive",
              disable: false
            }
          },
          {
            id: 2,
            field_0: 2,
            field_1: "Objetivo de evaluacion 1",
            field_2: "2018-02-28",
            field_3: "2018-02-28",
            field_4: "20.0 %",
            field_5: {
              type_method: "UPDATE",
              type_element: "button",
              icon: "fa-pencil",
              id: 1,
              title: "Editar",
              action_method: "updateEvaluationObjetive",
              disable: false
            },
            field_6: {
              type_method: "DELETE",
              type_element: "button",
              icon: "fa-trash",
              id: 1,
              title: "Eliminar",
              action_method: "deleteEvaluationObjetive",
              disable: false
            }
          }]
      }]

    });

    setTimeout(() => {
      this.objectReport.emit(this.ObjectivesTable[0]);
    }, 200);
  }


  ngOnInit() {
    // this.performanceEvaluationService.getEvaluationPerformanById(this.IdEvaluation)
    // .subscribe((data: any) => {
    //   console.log(data)
    // });
  }

  selectNamebutton() {
    this.bedit = true;
  }
  newObjetive(model) {
    this.showSubmit = false;
     console.log(model)
  }
  editObjective(){
    
  }

}
