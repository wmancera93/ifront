import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { TravelService } from '../../../services/travel-management/travels/travel.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { ApproverTravelsService } from '../../../services/travel-management/approver-travels/approver-travels.service';
import { User } from '../../../models/general/user';
import { FiltersGeneralsService } from '../../../services/travel-management/filters-generals/filters-generals.service';
import { Translate } from '../../../models/common/translate/translate';
import { TranslateService } from '../../../services/common/translate/translate.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  public my_travels_list: any[] = [];
  public token: boolean;
  public alertWarning: any[] = [];
  public id_requests_travel: string;
  public aproover: string;
  public edit = false;
  public objectSend: any[];
  public third: string = '';
  public checkThird: boolean = true;
  public translate: Translate = null;
  public userAuthenticated: User = null;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router,
    private tokenService: Angular2TokenService,
    public travelsService: TravelsService,
    public travelService: TravelService, public alert: AlertsService,
    private aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService,
    public travelManagementService: TravelService,
    public filtersGeneralsService: FiltersGeneralsService, public translateService: TranslateService) {

    this.translate = this.translateService.getTranslate();
    this.aproover = this.translate.app.frontEnd.pages.travel_management.travel.approver_ts;
    this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
    this.alert.getActionConfirm().subscribe((data: any) => {
      document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
      if (data === 'deletRequestTravel') {
        this.travelService.deleteTravelById(this.id_requests_travel).subscribe(
          (data: any) => {
            this.alertWarning = [{
              type: 'success',
              title: this.translate.app.frontEnd.pages.travel_management.travel.type_alert_ts,
              message: this.translate.app.frontEnd.pages.travel_management.travel.message_alert_ts,
              confirmation: false,
            }];
            this.alert.setAlert(this.alertWarning[0]);

            switch (this.third) {
              case 'travels_request':
                this.third = 'travels_request';
                this.my_travels_list = [];
                this.travelService.getTravelRequests().subscribe((data: any) => {
                  this.my_travels_list = data.data[0].my_travel_requests_list;
                });
                break;
              case 'my_travels_request':
                this.third = 'my_travels_request';
                this.my_travels_list = [];
                this.travelService.getMyTravelRequests().subscribe((data: any) => {
                  this.my_travels_list = data.data[0].my_travel_requests_list;
                });
                break;

              default:
                break;
            }
          },
          (error: any) => {
            const alertWarning = [{ type: 'danger', title: this.translate.app.frontEnd.pages.travel_management.travel.type_alert_one_ts, message: error.json().errors.toString(), confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
          });
      }
      if (data === 'closeAlertdeletRequestTravel') {
        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:auto');
      }
    })


    this.travelService.getTravelRequests().subscribe((list: any) => {
      let url = window.location.href;
      url.split('/')[url.split('/').length - 1];
      if (url.split('/')[url.split('/').length - 1] !== 'travels') {
        this.travelsService.setEditTravels({ id_travel: url.split('/')[url.split('/').length - 1], send_travel: false });
      }
    });

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        });

    this.travelsService.getResultSaved().subscribe((data: any) => {

      if (data.success) {
        this.third = data.third == false ? 'travels_request' : 'my_travels_request';
        switch (this.third) {
          case 'travels_request':
            this.checkThird = true;
            this.third = 'travels_request';
            this.my_travels_list = [];
            this.travelService.getTravelRequests().subscribe((data: any) => {
              this.my_travels_list = data.data[0].my_travel_requests_list;
              this.aproover = this.my_travels_list[0].next_approver_to_json.approver_employee
              if (this.aproover !== '') {
                this.aproover = this.aproover;
              }
            });
            break;
          case 'my_travels_request':
            this.checkThird = false;
            this.third = 'my_travels_request';
            this.my_travels_list = [];
            this.travelService.getMyTravelRequests().subscribe((data: any) => {
              this.my_travels_list = data.data[0].my_travel_requests_list;
              this.aproover = this.my_travels_list[0].next_approver_to_json.approver_employee
              if (this.aproover !== '') {
                this.aproover = this.aproover;
              }
            });
            break;

          default:
            break;
        }
      }

    });
  }


  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.travelService.getTravelRequests().subscribe((data: any) => {
      this.checkThird = true;
      this.third = 'travels_request';
      this.my_travels_list = data.data[0].my_travel_requests_list;
    });

  }

  //begin filters

  public codIHR: string = '';
  public codSAP: string = '';
  public datesBegin: string = '';
  public datesEnd: string = '';
  public status: string = '';
  public statusLiquid: string = '';
  public codEmployee: string = '';
  public page: string = '';
  public is_collapse: boolean;

  filter(filter) {
    if (this.checkThird) {
      this.page = 'sol_vi_in';
      switch (filter) {
        case 'codIHR':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';

          if (this.codIHR !== '') {
            this.filtersGeneralsService.getSearchByTravelNumberIHR(this.page, this.codIHR).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getTravelRequests().subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          }
          break;
        case 'codSAP':
          this.codIHR = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.codSAP !== '') {
            this.filtersGeneralsService.getSearchByTravelNumberSAP(this.page, this.codSAP).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getTravelRequests().subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          }
          break;
        case 'dates':
          this.codSAP = '';
          this.codIHR = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.datesBegin !== '' && this.datesEnd !== '') {
            this.filtersGeneralsService.getSearchTravelByDate(this.page, this.datesBegin, this.datesEnd).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getTravelRequests().subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          }
          break;
        case 'status':
          this.codIHR = '';
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.status !== '') {
            this.filtersGeneralsService.getSearchTravelByStatus(this.page, this.status).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getTravelRequests().subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          }
          break;
        case 'statusLiquid':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.codIHR = '';
          this.codEmployee = '';
          if (this.statusLiquid !== '') {
            this.filtersGeneralsService.getSearchTravelByStatusLiquid(this.page, this.statusLiquid).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getTravelRequests().subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          }
          break;
        case 'codEmployee':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codIHR = '';
          if (this.codEmployee !== '') {
            this.filtersGeneralsService.getSearchTravelByEmployee(this.page, this.codEmployee).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getTravelRequests().subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          }
          break;

        default:
          break;
      }
    } else {
      this.page = 'sol_vi_third';
      switch (filter) {
        case 'codIHR':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';

          if (this.codIHR !== '') {
            this.filtersGeneralsService.getSearchByTravelNumberIHR(this.page, this.codIHR).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getMyTravelRequests().subscribe((data: any) => {
              this.my_travels_list = data.data[0].my_travel_requests_list;
            });
          }
          break;
        case 'codSAP':
          this.codIHR = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.codSAP !== '') {
            this.filtersGeneralsService.getSearchByTravelNumberSAP(this.page, this.codSAP).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getMyTravelRequests().subscribe((data: any) => {
              this.my_travels_list = data.data[0].my_travel_requests_list;
            });
          }
          break;
        case 'dates':
          this.codSAP = '';
          this.codIHR = '';
          this.status = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.datesBegin !== '' && this.datesEnd !== '') {
            this.filtersGeneralsService.getSearchTravelByDate(this.page, this.datesBegin, this.datesEnd).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getMyTravelRequests().subscribe((data: any) => {
              this.my_travels_list = data.data[0].my_travel_requests_list;
            });
          }
          break;
        case 'status':
          this.codIHR = '';
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.statusLiquid = '';
          this.codEmployee = '';
          if (this.status !== '') {
            this.filtersGeneralsService.getSearchTravelByStatus(this.page, this.status).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getMyTravelRequests().subscribe((data: any) => {
              this.my_travels_list = data.data[0].my_travel_requests_list;
            });
          }
          break;
        case 'statusLiquid':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.codIHR = '';
          this.codEmployee = '';
          if (this.statusLiquid !== '') {
            this.filtersGeneralsService.getSearchTravelByStatusLiquid(this.page, this.statusLiquid).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getMyTravelRequests().subscribe((data: any) => {
              this.my_travels_list = data.data[0].my_travel_requests_list;
            });
          }
          break;
        case 'codEmployee':
          this.codSAP = '';
          this.datesBegin = '';
          this.datesEnd = '';
          this.status = '';
          this.statusLiquid = '';
          this.codIHR = '';
          if (this.codEmployee !== '') {
            this.filtersGeneralsService.getSearchTravelByEmployee(this.page, this.codEmployee).subscribe(
              (data: any) => {
                this.my_travels_list = data.data[0].my_travel_requests_list;
              });
          } else {
            this.travelService.getMyTravelRequests().subscribe((data: any) => {
              this.my_travels_list = data.data[0].my_travel_requests_list;
            });
          }
          break;

        default:
          break;
      }
    }
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

  //end filters

  checkTravels(travel) {
    switch (travel) {
      case 'travels_request':
        this.checkThird = true;
        this.third = 'travels_request';
        this.my_travels_list = [];
        this.travelService.getTravelRequests().subscribe((data: any) => {
          this.my_travels_list = data.data[0].my_travel_requests_list;
        });
        break;
      case 'my_travels_request':
        this.checkThird = false;
        this.third = 'my_travels_request';
        this.my_travels_list = [];
        this.travelService.getMyTravelRequests().subscribe((data: any) => {
          this.my_travels_list = data.data[0].my_travel_requests_list;
        });
        break;

      default:
        break;
    }
  }

  returnBackPage() {
    this.router.navigate(['ihr/travel_management']);
  }

  newFormTravel() {
    this.travelsService.setNewTravels(true)
  }

  viewTravels(id_travel: number) {
    this.travelsService.setViewTravels(id_travel);
  }

  editTravels(travel: number) {
    this.travelsService.setEditTravels({ id_travel: travel, send_travel: true });
  }

  deleteTravels(id: string) {
    this.id_requests_travel = id;
    this.alertWarning = [{
      type: 'warning',
      title: this.translate.app.frontEnd.pages.travel_management.travel.type_alert_two_ts,
      message: this.translate.app.frontEnd.pages.travel_management.travel.message_alert_one_ts + id.toString() + '?',
      confirmation: true,
      typeConfirmation: 'deletRequestTravel'
    }];
    this.alert.setAlert(this.alertWarning[0]);
  }

  seeAproverFlow(id_travel: string) {
    setTimeout(() => {
      this.travelManagementService.getTravelRequestsByid(id_travel, this.edit).subscribe((result: any) => {
        this.objectSend = result.data[0].travel_request;
        this.aproversRequestsService.setRequests({ request: this.objectSend, type_request: 'requestsTravels' });
      });
    }, 500);

  }
  messages_error(id_travel) {
    this.travelsService.setMessageError(id_travel);
  }
}
