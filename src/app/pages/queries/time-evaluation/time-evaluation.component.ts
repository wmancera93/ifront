import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';

@Component({
  selector: 'app-time-evaluation',
  templateUrl: './time-evaluation.component.html',
  styleUrls: ['./time-evaluation.component.css']
})
export class TimeEvaluationComponent implements OnInit {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Evaluación de tiempos';
  public token: boolean;
  public is_collapse: boolean = false;
  public allevaluationmessage: any[] = [];
  public periodi_timevaluation: Date;
  public periodf_timevaluation: Date;
  public dateBegin: string = null;
  public dateEnd: string = null;
  public condition: any[] = [];
  public arreglo: string = "";
  public finalDate: number;


  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public queriesService: QueriesService,
    public router: Router,
    private tokenService: Angular2TokenService,
    public alertsService: AlertsService) {
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
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.queriesService.getAllEvaluationTime()
      .subscribe((data: any) => {
        this.objectReport.emit(data)
      });
  }
  // getFilterMessagesByMonth() {
  //   this.queriesService.getEvaluationMessagesByMonth(this.month)
  //     .subscribe((data: any) => {
  //       this.objectReport.emit(data);
  //     });
  // }

  // getFilterMessagesByDay() {
  //   this.queriesService.getEvaluationMessagesByDay(this.day)
  //     .subscribe((data: any) => {
  //       this.objectReport.emit(data);
  //     });
  // }


  filterByperiod() {    
    if (this.periodi_timevaluation === null  && this.periodf_timevaluation === null) {
      this.allTimeEvaluation();
    } else {
      this.dateBegin = this.periodi_timevaluation.toString().replace('-', '').replace('-', '');
      this.dateEnd = this.periodf_timevaluation.toString().replace('-', '').replace('-', '');

      this.getFilterMessagesByPeriod();
      this.periodi_timevaluation = null;
      this.periodf_timevaluation = null;
    }
  }
  comparisonDate() {
    
    this.dateBegin = this.periodi_timevaluation.toString().replace('-', '').replace('-', '');
    this.dateEnd = this.periodf_timevaluation.toString().replace('-', '').replace('-', '');
    this.finalDate = parseInt(this.dateEnd) - parseInt(this.dateBegin);
    
    if (this.finalDate < 0) {

      const alertDataWrong: Alerts[] = [{
        type: 'danger',
        title: 'Error',
        message: 'La fecha final no puede ser mayor que la inicial',
        confirmation: false
      }];
      this.alertsService.setAlert(alertDataWrong[0]);

    }
  }
  allTimeEvaluation() {
    this.queriesService.getAllEvaluationTime()
      .subscribe((data: any) => {
        this.objectReport.emit(data)
       
      });
  }
  getFilterMessagesByPeriod() {
    this.queriesService.getEvaluationMessagesByPeriod(this.dateBegin, this.dateEnd)
      .subscribe((data: any) => {
        this.objectReport.emit(data);
      });
  }

  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

}


