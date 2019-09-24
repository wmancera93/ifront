import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  NotificationPrimary,
  NotificationSecundary,
  Estadistics,
  Calendar,
  Newspaper,
  EventsEmployess,
} from '../../../models/common/widgets/widgets';
import { Enterprise } from '../../../models/general/enterprise';
import { DashboardEmployeeService } from '../../../services/dashboard/employee/dashboard-employee.service';
import { Router } from '@angular/router';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { Employee, PermitsUser } from '../../../models/general/user';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  @Output() objectRequest: EventEmitter<NotificationPrimary> = new EventEmitter();
  @Output() objectVacations: EventEmitter<NotificationSecundary> = new EventEmitter();
  @Output() objectMyLayoffs: EventEmitter<Estadistics> = new EventEmitter();
  @Output() objectMyInterestsLayoffs: EventEmitter<Estadistics> = new EventEmitter();
  @Output() objectIncome: EventEmitter<Estadistics> = new EventEmitter();
  @Output() objectDeductions: EventEmitter<Estadistics> = new EventEmitter();
  @Output() objectCalendar: EventEmitter<Calendar> = new EventEmitter();
  @Output() objectNewspaper: EventEmitter<Newspaper[]> = new EventEmitter();
  @Output() objectBirthDay: EventEmitter<EventsEmployess[]> = new EventEmitter();
  @Output() objectAnniversay: EventEmitter<EventsEmployess[]> = new EventEmitter();
  @Output() objectNewEmployee: EventEmitter<EventsEmployess[]> = new EventEmitter();
  @Output() objectQinquennials: EventEmitter<EventsEmployess[]> = new EventEmitter();
  @Output() objectQinquennialsPayment: EventEmitter<EventsEmployess[]> = new EventEmitter();

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.dashboard.${key}`;
  }

  // @Output() InterestChartType: EventEmitter<string> = new EventEmitter();
  public layoffsChartType: EventEmitter<string> = new EventEmitter();
  public dataEnterprise: Enterprise = null;
  public dataUser: Employee = null;
  public PermitsUser = PermitsUser;

  constructor(
    public dashboardEmployeeService: DashboardEmployeeService,
    public router: Router,
    public stylesExplorerService: StylesExplorerService,
  ) {
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));

    this.dashboardEmployeeService.getRequest().subscribe((data: any) => {
      this.objectRequest.emit(data.data);
    });
    this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
    this.dataUser = JSON.parse(localStorage.getItem('user')).employee;

    this.dashboardEmployeeService.getRequest().subscribe((data: any) => {
      this.objectRequest.emit(data.data);
    });

    this.dashboardEmployeeService.getVacations().subscribe((data: any) => {
      this.objectVacations.emit(data.data);
    });

    this.dashboardEmployeeService.getCalendar().subscribe((data: any) => {
      this.objectCalendar.emit(data.data);
    });

    this.dashboardEmployeeService.getSeverancesData().subscribe((data: any) => {
      this.objectMyLayoffs.emit({
        graph_type: data.data.graph_type,
        properties: data.data.severances,
      });
      this.objectMyInterestsLayoffs.emit({
        graph_type: data.data.graph_type,
        properties: data.data.severances_interests,
      });
    });

    this.dashboardEmployeeService.getIncomesData().subscribe((data: any) => {
      const { permits } = this.dataUser;
      const { PERMISSIONS_SEE_INCOME, PERMISSIONS_SEE_RETENTIONS } = PermitsUser;
      if (permits[PERMISSIONS_SEE_INCOME] && permits[PERMISSIONS_SEE_INCOME].state) {
        this.objectIncome.emit({
          graph_type: data.data.graph_type,
          properties: data.data.total_incomes,
        });
      }
      if (permits[PERMISSIONS_SEE_RETENTIONS] && permits[PERMISSIONS_SEE_RETENTIONS].state) {
        this.objectDeductions.emit({
          graph_type: data.data.graph_type,
          properties: data.data.total_deductions,
        });
      }
    });

    this.dashboardEmployeeService.getNewspaper().subscribe((data: any) => {
      if (data.success === true) {
        this.objectNewspaper.emit(data.data);
      }
    });

    this.dashboardEmployeeService.getEventsEmployee().subscribe((data: any) => {
      if (data.success === true) {
        this.objectAnniversay.emit(data.data[0].anniversaries);
        this.objectBirthDay.emit(data.data[0].birthdays);
        this.objectNewEmployee.emit(data.data[0].new_employees);
      }
    });

    this.dashboardEmployeeService.getQuinquennialsData().subscribe((data: any) => {
      this.objectQinquennials.emit(data.data);
    });

    this.dashboardEmployeeService.getQuinquennialsPaymentsData().subscribe((data: any) => {
      this.objectQinquennialsPayment.emit(data.data);
    });

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 3000);

    setTimeout(() => {
      // document.getElementById("loginId").style.display = 'none'
      // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
    }, 1000);
  }
}
