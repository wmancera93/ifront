import { Component, OnInit, EventEmitter } from '@angular/core';
import { AdvanceSharedService } from '../../../../services/shared/advance-shared/advance-shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdvancesService } from '../../../../services/travel-management/advances/advances.service';
import { DataDableSharedService } from '../../../../services/shared/common/data-table/data-dable-shared.service';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { User } from '../../../../models/general/user';
import { EmployeeService } from '../../../../services/common/employee/employee.service';
import { Router } from '@angular/router';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-advances',
  templateUrl: './new-advances.component.html',
  styleUrls: ['./new-advances.component.css'],
})
export class NewAdvancesComponent implements OnInit {
  public showSubmit = true;
  public formAdvanceTravel: any;
  public listTravelsFromAdvance: any;
  public listMoneyTypes: any;
  public infoTableAdvances: any[] = [];
  public objectAdvances: any[] = [];
  public idAdvance = 0;
  public advancesItems: any[] = [];
  public objectReport: EventEmitter<any> = new EventEmitter();
  public dd: any;
  public mm: any;
  public yyyy: any;
  public today: any;
  public continue = false;
  public todayStandar: string;
  public edit = false;
  public objetcThird: any;

  public userAuthenticated: User = null;
  public searchByLetter: string;
  public nameEmployee = '';
  public searchEmployee: any[] = [];
  public showListAutoC = false;
  public eployee_selected: any = null;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.advances.new_advance.${key}`;
  }

  constructor(
    public advanceSharedService: AdvanceSharedService,
    public advancesService: AdvancesService,
    public fb: FormBuilder,
    private accionDataTableService: DataDableSharedService,
    public alert: AlertsService,
    public employeeService: EmployeeService,
    public router: Router,
    public travelManagementService: TravelService,
    public translate: TranslateService,
  ) {
    this.userAuthenticated = JSON.parse(localStorage.getItem('user'));

    this.infoTableAdvances = [
      {
        success: true,
        data: [{ data: [] }],
      },
    ];

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (
        data === 'confirmSaveAdvance' ||
        data === 'errorConfirmTravelID' ||
        data === 'errorValidationAdvance' ||
        data === 'confirmDate'
      ) {
        document.getElementById('btn_advances_new').click();
      }
      if (data === 'returnTravelsRequests') {
        this.router.navigate(['/ihr/travel_management/travels']);
      }
    });

    this.formAdvanceTravel = new FormGroup({});
    this.formAdvanceTravel = fb.group({
      travel_request_id: '',
      currency_id: '',
      value: '',
      date: '',
      observation: '',
      box: '',
    });

    this.accionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data.action_method === 'deleteAdvance') {
        this.deleteAdvance(data);
      }
    });

    this.advanceSharedService.getNewAdvance().subscribe((data: any) => {
      this.eployee_selected = null;
      this.objectAdvances = [];
      this.continue = false;

      this.formAdvanceTravel = new FormGroup({});
      this.formAdvanceTravel = fb.group({
        travel_request_id: data == true ? '' : data,
        currency_id: '',
        value: '',
        date: this.todayStandar,
        observation: '',
        box: '',
      });

      this.refreshTableAdvances();
      if (document.getElementById('advance_new').className !== 'modal show') {
        document.getElementById('btn_advances_new').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }

      if (data !== true) {
        this.continue = true;
      } else {
        this.continue = false;
      }

      if (data !== true) {
        this.travelManagementService
          .getTravelRequestsByid(data, this.edit)
          .subscribe((third: any) => {
            if (
              third.data[0].travel_request.employee_applicant_to_json
                .personal_code !=
              JSON.parse(localStorage.getItem('user')).employee.pernr
            ) {
              this.objetcThird = {
                id: third.data[0].travel_request.employee_applicant_to_json.id,
                name_complete:
                  third.data[0].travel_request.employee_applicant_to_json
                    .short_name,
              };
              this.returnObjectSearch(this.objetcThird);
            } else {
              this.objetcThird = {};
              this.advancesService
                .getAdvanceListTravel(
                  JSON.parse(
                    localStorage.getItem('user'),
                  ).employee_id.toString(),
                )
                .subscribe((list: any) => {
                  this.listTravelsFromAdvance = this.sortByNumber(list.data);
                });
            }
          });
      } else {
        this.advancesService
          .getAdvanceListTravel(
            JSON.parse(localStorage.getItem('user')).employee_id.toString(),
          )
          .subscribe((list: any) => {
            this.listTravelsFromAdvance = this.sortByNumber(list.data);
          });
      }
    });

    this.advancesService.getAdvanceMoneyList().subscribe((money: any) => {
      this.listMoneyTypes = money.data;
    });

    this.advancesService.getAdvancePayments().subscribe((advances: any) => {
      this.advancesItems = advances.data;
    });
  }

  ngOnInit() {
    const fecha = new Date();
    this.todayStandar =
      fecha.getFullYear().toString() +
      '-' +
      (fecha.getMonth() + 1).toString() +
      '-' +
      (fecha.getDate().toString().length == 1
        ? '0' + fecha.getDate().toString()
        : fecha.getDate().toString());
  }

  sortByNumber(dataBySort: any) {
    dataBySort.sort(function(a, b) {
      return b.id - a.id;
    });
    return dataBySort;
  }
  enterNameEmployee() {
    this.nameEmployee = this.searchByLetter;
    if (this.nameEmployee !== null) {
      this.employeeService
        .getEmployeeTravelsById(this.nameEmployee)
        .subscribe((data: any) => {
          if (data.data.length > 0) {
            this.searchEmployee = data.data;
            this.showListAutoC = true;
          } else {
            this.searchEmployee = [];
            this.showListAutoC = true;
          }
        });
    }
  }

  returnObjectSearch(ObjectSearch: any) {
    this.eployee_selected = ObjectSearch;
    this.searchByLetter = null;
    this.searchEmployee = [];
    this.advancesService
      .getAdvanceListTravel(this.eployee_selected.id.toString())
      .subscribe((list: any) => {
        this.listTravelsFromAdvance = this.sortByNumber(list.data);
      });
  }

  deleteEmployeeThird() {
    this.eployee_selected = null;
  }

  newAdvance() {
    this.showSubmit = false;
    const objectSendAdvance = {
      travel_request_id: this.formAdvanceTravel.controls['travel_request_id']
        .value,
      employee_id:
        this.eployee_selected == null
          ? ''
          : this.eployee_selected.id.toString(),
      advances: this.objectAdvances,
    };

    this.advancesService.postAdvanceList(objectSendAdvance).subscribe(
      (response: any) => {
        this.advancesService
          .sendRequestToApprove(
            response.data.travel_advance_request.id.toString(),
          )
          .subscribe(
            () => {
              document.getElementById('btn_advances_new').click();
              const alertSuccess: Alerts[] = [
                {
                  type: 'success',
                  title: this.t('message_alert_ts'),
                  message: response.message + this.t('message_alert_ts'),
                  confirmation: true,
                  typeConfirmation: 'returnTravelsRequests',
                },
              ];

              document.getElementById('closeAdvances').click();
              this.alert.setAlert(alertSuccess[0]);
              this.advanceSharedService.setRefreshAdvanceList(true);
              this.showSubmit = true;
            },
            (error: any) => {
              this.advancesService
                .deleteRequestAdvance(
                  response.data.travel_advance_request.id.toString(),
                )
                .subscribe(() => {
                  document.getElementById('btn_advances_new').click();
                  const alertWarning: Alerts[] = [
                    {
                      type: 'danger',
                      title: this.t('message_alert_ts_one'),
                      message: error.json().errors.toString(),
                      confirmation: false,
                      typeConfirmation: 'errorValidationAdvance',
                    },
                  ];

                  this.alert.setAlert(alertWarning[0]);
                  this.showSubmit = true;
                });
            },
          );
      },
      (error: any) => {
        document.getElementById('btn_advances_new').click();
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('message_alert_ts_one'),
            message: error.json().errors.toString(),
            confirmation: true,
            typeConfirmation: 'errorValidationAdvance',
          },
        ];

        this.alert.setAlert(alertWarning[0]);
        this.showSubmit = true;
      },
    );
  }
  delete(date_param) {
    if (date_param == 'date_body') {
      this.formAdvanceTravel.controls['date'].setValue('');
    }
  }

  aditionAdvance(dataAgree) {
      
    const dayPayment = dataAgree.date.split('-');
    const dayFinally =
      dayPayment[2] + '/' + dayPayment[1] + '/' + dayPayment[0];

    this.infoTableAdvances[0].data[0].data.push({
      field_0: this.idAdvance + 1,
      field_1: this.listTravelsFromAdvance.filter(
        data => data.id.toString() === dataAgree.travel_request_id.toString(),
      )[0].name_travel,
      field_2: this.listMoneyTypes.filter(
        data => data.id.toString() === dataAgree.currency_id.toString(),
      )[0].name,
      field_3: dayFinally,
      field_4: dataAgree.value,
      field_5: dataAgree.observation.toUpperCase(),
      field_6: dataAgree.box == true ? 'Si' : 'No',
      field_7: {
        type_method: 'DELETE',
        type_element: 'button',
        icon: 'fa-trash',
        id: this.idAdvance + 1,
        title: 'Eliminar',
        action_method: 'deleteAdvance',
        disable: false,
      },
    });

    this.objectAdvances.push({
      id_advance: this.idAdvance + 1,
      travel_request_id: dataAgree.travel_request_id,
      currency_id: dataAgree.currency_id,
      value: dataAgree.value,
      date: dataAgree.date,
      observation: dataAgree.observation,
      box: dataAgree.box,
    });

    this.idAdvance += 1;

    this.formAdvanceTravel.controls['currency_id'].setValue('');
    this.formAdvanceTravel.controls['value'].setValue('');
    this.formAdvanceTravel.controls['date'].setValue(this.todayStandar);
    this.formAdvanceTravel.controls['observation'].setValue('');
    this.formAdvanceTravel.controls['box'].setValue('');

    setTimeout(() => {
      this.objectReport.emit(this.infoTableAdvances[0]);
    }, 500);

    setTimeout(() => {
      document.getElementById('advance_new').scrollTo(0, 1000);
    }, 200);
  }

  validateTravel(travel: any) {
    if (travel.travel_request_id !== '') {
      this.continue = true;
    } else {
      this.continue = false;
    }
  }

  validateDateAdvance(date: any) {
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth() + 1;
    this.yyyy = this.today.getFullYear();
    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }

    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }
    this.today = (this.yyyy + '-' + this.mm + '-' + this.dd).toString();
    if (date.date !== this.today) {
      const enterDate = date.date.replace('-', '').replace('-', '');
      const actualDate = this.today.replace('-', '').replace('-', '');
      if (actualDate - enterDate < 1) {
      } else {
        document.getElementById('closeAdvances').click();
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('message_alert_ts_one'),
            message: this.t('message_alert_ts_one'),
            confirmation: true,
            typeConfirmation: 'confirmDate',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      }
    }
  }

  deleteAdvance(params: any) {
    this.infoTableAdvances[0].data[0].data.splice(
      this.infoTableAdvances[0].data[0].data.findIndex(
        filter => filter.field_0 === params.id,
      ),
      1,
    );
    this.objectAdvances.splice(
      this.objectAdvances.findIndex(filter => filter.id_advance === params.id),
      1,
    );
    this.objectReport.emit(this.infoTableAdvances[0]);
  }

  refreshTableAdvances() {
    this.infoTableAdvances = [];
    this.infoTableAdvances.push({
      success: true,
      data: [
        {
          title: this.t('name_data_table_ts'),
          title_table: 'Anticipos solicitados',
          labels: {
            field_1: {
              value: this.t('field_one'),
              type: 'string',
              sortable: false,
            },
            field_2: {
              value: this.t('field_two'),
              type: 'string',
              sortable: false,
            },

            field_3: {
              value: this.t('field_three'),
              type: 'string',
              sortable: false,
            },
            field_4: {
              value: this.t('field_four'),
              type: 'string',
              sortable: false,
            },
            field_5: {
              value: this.t('field_five'),
              type: 'string',
              sortable: false,
            },
            field_6: {
              value: this.t('field_six'),
              type: 'string',
              sortable: false,
            },
            field_7: {
              value: this.t('field_seven'),
              type: 'string',
              sortable: false,
            },
          },
          data: [],
        },
      ],
    });
    setTimeout(() => {
      this.objectReport.emit(this.infoTableAdvances[0]);
    }, 100);
  }
  onlyNumber(param) {
    let out = '';
    const filtro = '0123456789.,';
    for (let i = 0; i < param.value.length; i++) {
      if (filtro.indexOf(param.value.charAt(i)) != -1) {
        out += param.value.charAt(i);
      }
    }
    this.formAdvanceTravel.controls['value'].setValue(out);
  }
}
