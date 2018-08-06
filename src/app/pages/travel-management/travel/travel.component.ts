import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { TravelsService } from '../../../services/shared/travels/travels.service';
import { TravelService } from '../../../services/travel-management/travels/travel.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Alert } from '../../../../../node_modules/@types/selenium-webdriver';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {


  public my_travels_list: any[] = [];
  public token: boolean;
  public alertWarning: any[] = [];

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router,
    private tokenService: Angular2TokenService,
    public travelsService: TravelsService,
    public travelService: TravelService, public alert: AlertsService) {


    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'deletRequestTravel') {
        this.travelService.getTravelRequests().subscribe((data: any) => {
          this.my_travels_list = data.data[0].my_travel_requests_list;
        });
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
      if (data) {
        this.travelService.getTravelRequests().subscribe((data: any) => {
          this.my_travels_list = [];
          this.my_travels_list = data.data[0].my_travel_requests_list;
        });
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
      this.my_travels_list = data.data[0].my_travel_requests_list;
    });

    this.travelService.getTravelRequestsByid('13').subscribe((data: any) => {
      
    });
    
    
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

  editTravels(id_travel: number) {
    this.travelsService.setEditTravels(id_travel);
  }

  deleteTravels(id: string) {
    this.travelService.deleteTravelById(id).subscribe(
      (data: any) => {
        this.alertWarning = [{
          type: 'warning',
          title: 'Confirmación',
          message: '¿Desea eliminar la solicitud de viaje con ticket #' + id.toString() + '?',
          confirmation: true,
          typeConfirmation: 'deletRequestTravel'
        }];
        this.alert.setAlert(this.alertWarning[0]);
      },
      (error: any) => {
        alert('eliminado no');
      });
  }
}
