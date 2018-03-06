import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationSecundary, EventsEmployess, NotificationPrimary, Estadistics, ProgressPrimary } from '../../../models/common/widgets/widgets';
import { User } from '../../../models/general/user';
import { DashboardManagerialService } from '../../../services/dashboard/managerial/dashboard-managerial.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-managerial',
  templateUrl: './managerial.component.html',
  styleUrls: ['./managerial.component.css']
})
export class ManagerialComponent implements OnInit {
  @Output() objectVacations: EventEmitter<NotificationSecundary> = new EventEmitter();
  @Output() objectIncapacityes: EventEmitter<NotificationSecundary> = new EventEmitter();
  @Output() objectPermissions: EventEmitter<NotificationSecundary> = new EventEmitter();
  @Output() objectMyTeam: EventEmitter<EventsEmployess[]> = new EventEmitter();
  @Output() objectReports: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectWoman: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectMen: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectAbsenteeism: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectQueryCompany: EventEmitter<ProgressPrimary[]> = new EventEmitter();
  @Output() objectPermissionsUsers: EventEmitter<ProgressPrimary[]> = new EventEmitter();
   public validateMyTeam : string;
  constructor(public dasboardManagerialService: DashboardManagerialService,
  public router:Router) {
  }

  ngOnInit() {
    this.dasboardManagerialService.getWidgetEmployeeOnVacations()
      .subscribe((data: any) => {
        this.objectVacations.emit(data.data);
      });

    this.dasboardManagerialService.getWidgetEmployeeOnPermition()
    .subscribe((data:any)=>{
      this.objectPermissions.emit(data.data);      
    });

    this.dasboardManagerialService.getwidgetEmployeeOnAbsences()
    .subscribe((data:any)=>{
      this.objectAbsenteeism.emit(data.data);
    });

    this.dasboardManagerialService.getWidgetMyteam()
    .subscribe((data:any)=>{    
         this.objectMyTeam.emit(data.data);
        //  this.validateMyTeam == data.data;
        //  console.log(this.validateMyTeam);
    });
    
    this.dasboardManagerialService.getWidgetCompanyrequest()
    .subscribe((data:any)=>{     
      this.objectQueryCompany.emit(data.data);      
    });
    
    this.dasboardManagerialService.getWidgetPermissionsUser()
    .subscribe((data:any)=>{
      this.objectPermissionsUsers.emit(data.data);
    });

    this.dasboardManagerialService.getWidgetMalePercent()
    .subscribe((data:any)=>{
      this.objectMen.emit(data.data);
    });

    this.dasboardManagerialService.getWidgetFemalePercent()
    .subscribe((data:any)=>{
      this.objectWoman.emit(data.data);
    });

    const incapacityes: NotificationSecundary[] = [];
    this.objectIncapacityes.emit(incapacityes[0]);

    const reports: NotificationPrimary[] = [];
    this.objectReports.emit(reports[0]);

    
  }

  goToMyTeam(){
    this.router.navigate(['/ihr/my_team']);
  }
}
