import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationSecundary, EventsEmployess, NotificationPrimary, Estadistics, ProgressPrimary } from '../../../models/common/widgets/widgets';
import { User } from '../../../models/general/user';
import { DashboardManagerialService } from '../../../services/dashboard/managerial/dashboard-managerial.service';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { ManagerialDataService } from '../../../services/shared/common/managerial-data/managerial-data.service';

@Component({
  selector: 'app-managerial',
  templateUrl: './managerial.component.html',
  styleUrls: ['./managerial.component.css']
})
export class ManagerialComponent implements OnInit {
  @Output() objectVacations: EventEmitter<NotificationSecundary> = new EventEmitter();
  @Output() objectDataVacations: EventEmitter<any> = new EventEmitter();
  @Output() objectIncapacityes: EventEmitter<NotificationSecundary> = new EventEmitter();
  @Output() objectPermissions: EventEmitter<NotificationSecundary> = new EventEmitter();
  @Output() objectMyTeam: EventEmitter<EventsEmployess[]> = new EventEmitter();
  @Output() objectReports: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectWoman: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectMen: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectAbsenteeism: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectQueryCompany: EventEmitter<ProgressPrimary[]> = new EventEmitter();
  @Output() objectPermissionsUsers: EventEmitter<ProgressPrimary[]> = new EventEmitter();
  @Output() modalDataManagerial: EventEmitter<string> = new EventEmitter();

  public validateMyTeam: string;
  public dataMyTeam: boolean = true;
  public dataManagerial: any;

  constructor(public dasboardManagerialService: DashboardManagerialService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public managerialDataShared: ManagerialDataService) {
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          // console.log(res)
        },
        (error) => {
          // console.log(error)
        })

  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.dasboardManagerialService.getWidgetEmployeeOnVacations()
      .subscribe((data: any) => {
        this.objectVacations.emit(data.data);
      });

    this.dasboardManagerialService.getWidgetEmployeeOnPermition()
      .subscribe((data: any) => {
        this.objectPermissions.emit(data.data);
      });

    this.dasboardManagerialService.getwidgetEmployeeOnAbsences()
      .subscribe((data: any) => {
        this.objectAbsenteeism.emit(data.data);
      });

    this.dasboardManagerialService.getwidgetEmployeeOnIncapacities()
      .subscribe((data: any) => {
        this.objectIncapacityes.emit(data.data);
      });

    this.dasboardManagerialService.getWidgetMyteam()
      .subscribe((data: any) => {
        if (data.data.length === 0) {
          this.dataMyTeam = false;
        } else {
          this.dataMyTeam = true;
        }
        this.objectMyTeam.emit(data.data);
      });

    this.dasboardManagerialService.getWidgetCompanyrequest()
      .subscribe((data: any) => {
        this.objectQueryCompany.emit(data.data);
      });

    this.dasboardManagerialService.getWidgetPermissionsUser()
      .subscribe((data: any) => {
        this.objectPermissionsUsers.emit(data.data);
      });

    this.dasboardManagerialService.getWidgetMalePercent()
      .subscribe((data: any) => {
        this.objectMen.emit(data.data);
      });

    this.dasboardManagerialService.getWidgetFemalePercent()
      .subscribe((data: any) => {
        this.objectWoman.emit(data.data);
      });

    // const incapacityes: NotificationSecundary[] = [];
    // this.objectIncapacityes.emit(incapacityes[0]);

    const reports: NotificationPrimary[] = [];
    this.objectReports.emit(reports[0]);



    // setTimeout(() => {
    //   document.getElementById("loginId").style.display = 'none'
    //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
    // }, 1000)
  }
  detailVacations() {
    this.modalDataManagerial.emit('modalDataVacations');
    this.dasboardManagerialService.getDataVacationsSubordinates()
      .subscribe((data: any) => {
        this.dataManagerial = data;
        this.managerialDataShared.setDataManagerial({ objectInfo: this.dataManagerial, modal: 'modalDataVacations' });
      });

  }

  detailPermitions() {
    this.modalDataManagerial.emit('modalDataPermitions');
    this.dasboardManagerialService.getDataConsultationsSubordinates()
      .subscribe((data: any) => {
        this.dataManagerial = data;
        this.managerialDataShared.setDataManagerial({ objectInfo: this.dataManagerial, modal: 'modalDataPermitions' });
      });
  }

  detailIncapacities() {
    this.modalDataManagerial.emit('modalDataIncapacities');
    this.dasboardManagerialService.getDataIncapacitiesSubordinates()
      .subscribe((data: any) => {
        this.dataManagerial = data;
        this.managerialDataShared.setDataManagerial({ objectInfo: this.dataManagerial, modal: 'modalDataIncapacities' });
      });
  }

}


