import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { TravelService } from '../../../services/travel-management/travels/travel.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { ApproverTravelsService } from '../../../services/travel-management/approver-travels/approver-travels.service';
import { User } from '../../../models/general/user';

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
  public aproover: string = 'No existe aprobador para esta solicitud ó ya fue aprobada';
  public edit = false;
  public objectSend: any[];
  public third: string = '';
  public checkThird: boolean = true;

  public userAuthenticated: User = null;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router,
    private tokenService: Angular2TokenService,
    public travelsService: TravelsService,
    public travelService: TravelService, public alert: AlertsService,
    private aproversRequestsService: AproversRequestsService,
    public approverTravelsService: ApproverTravelsService, public travelManagementService: TravelService) {


    this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
    this.alert.getActionConfirm().subscribe((data: any) => {
      document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
      if (data === 'deletRequestTravel') {
        this.travelService.deleteTravelById(this.id_requests_travel).subscribe(
          (data: any) => {
            this.alertWarning = [{
              type: 'success',
              title: 'Solicitud exitosa',
              message: 'La solicitud de viaje se elimino correctamente',
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
            const alertWarning = [{ type: 'danger', title: 'Solicitud Denegada', message: error.json().errors.toString(), confirmation: false }];
            this.alert.setAlert(alertWarning[0]);
          });
      }
      if (data === 'closeAlertdeletRequestTravel') {
        document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:auto');
      }
    })

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
    this.travelsService.setEditTravels(travel);
  }

  deleteTravels(id: string) {
    this.id_requests_travel = id;
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar la solicitud de viaje con ticket #' + id.toString() + '?',
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

}
