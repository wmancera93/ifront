import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationSecundary, EventsEmployess, NotificationPrimary, Estadistics, ProgressPrimary } from '../../../models/common/widgets/widgets';
import { User } from '../../../models/general/user';
import { DashboardManagerialService } from '../../../services/dashboard/managerial/dashboard-managerial.service';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { ManagerialDataService } from '../../../services/shared/common/managerial-data/managerial-data.service';
import { ButtonReturnService } from '../../../services/shared/common/managerial-data/button-return/button-return.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

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
  @Output() objectExtraHours: EventEmitter<Estadistics> = new EventEmitter();
  @Output() objectExtraHoursBar: EventEmitter<ProgressPrimary[]> = new EventEmitter();

  public validateMyTeam: string;
  public dataMyTeam: boolean = true;
  public dataManagerial: any;
  public activeButton: boolean = true;

  constructor(public dasboardManagerialService: DashboardManagerialService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public managerialDataShared: ManagerialDataService,
    public buttonReturnService: ButtonReturnService,
    public stylesExplorerService: StylesExplorerService) {

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

    let data = {
      background: "#33446e",
      color: "#FFFFFF",
      comment: "Horas extra",
      data: {
        colors: ["#070B19", "#0A0A2A", "#0B0B3B", "#0B0B61", "#08088A", "#0404B4", "#0101DF", "#0000FF", "#2E2EFE", "#5858FA", "#8181F7"],
        names: ["Extra Festiva Nocturna", "Extra Diurna al 35%", "Extra Nooc Trab Continuo", "Extra Ordinaria Diurna", "Extra Festiva Diurna", "Extra Ordinaria Nocturna", "Extra Nocturna al 65%", "Extra Campo al 100%", "Extra Campo Noc al 150%", "Extra Festivo Trab Continuo", "Extra Planificada planta"],
        values: [5, 15, 16, 18, 20, 25, 30, 43, 95, 143, 497]
      },
      number: "90.32%",
      subtitle: "Saldo de",
      title: "Cantidad horas extra por tipo de hora"

    };

    let dataBar:any = {
      data: [{
        icon: "",
        percentage_value: "3%",
        title: "Extra Festiva Nocturna",
        value: 3
      }, {
        icon: "",
        percentage_value: "6%",
        title: "Extra Diurna al 35%",
        value: 6
      }, {
        icon: "",
        percentage_value: "8%",
        title: "Extra Nooc Trab Continuo",
        value: 8
      }, {
        icon: "",
        percentage_value: "10%",
        title: "Extra Festiva Diurna",
        value: 10
      }, {
        icon: "",
        percentage_value: "11%",
        title: "Extra Campo al 100%",
        value: 11
      }, {
        icon: "",
        percentage_value: "11%",
        title: "Extra Ordinaria Diurna",
        value: 11
      }, {
        icon: "",
        percentage_value: "13%",
        title: "Extra Ordinaria Nocturna",
        value: 13
      }, {
        icon: "",
        percentage_value: "21%",
        title: "Extra Nocturna al 65%",
        value: 21
      }, {
        icon: "",
        percentage_value: "25%",
        title: "Extra Campo Noc al 150%",
        value: 25
      }, {
        icon: "",
        percentage_value: "46%",
        title: "Extra Festivo Trab Continuo",
        value: 46
      }, {
        icon: "",
        percentage_value: "177%",
        title: "Extra Planificada planta",
        value: 177
      }],
      title: "Cantidad de personas por horas extra"

    }

    setTimeout(() => {
      this.objectExtraHours.emit({ graph_type: "Doughnut", properties: data });
    }, 100);

    setTimeout(() => {
      this.objectExtraHoursBar.emit(dataBar);
    }, 100);


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
        if (data.success) {
          this.objectPermissionsUsers.emit(data.data);
        } else {
          this.objectPermissionsUsers.emit([]);
        }

      },
        (error: any) => {
          if (error.success) {
            this.objectPermissionsUsers.emit(error.data);
          } else {
            this.objectPermissionsUsers.emit([]);
          }

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


    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 3000);
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

  sendDataButton() {
    this.buttonReturnService.setButtonReturn(this.activeButton);
  }

}


