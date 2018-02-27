import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationPrimary, NotificationSecundary, Estadistics, Calendar, Newspaper, EventsEmployess } from '../../../models/common/widgets/widgets';
import { Enterprise } from '../../../models/general/enterprise';
import { User } from '../../../models/general/user';
import { DashboardEmployeeService } from '../../../services/dashboard/employee/dashboard-employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
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

  constructor(public dashboardEmployeeService: DashboardEmployeeService) {
    setInterval(() => {
      (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[0]).click();
    }, 20000)
    setInterval(() => {
      (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[1]).click();
    }, 30000)
    setInterval(() => {
      (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[2]).click();
    }, 40000)
    setInterval(() => {
      (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[3]).click();
    }, 50000)
  }

  ngOnInit() {
    this.dashboardEmployeeService.getRequest()
      .subscribe((data: any) => {
        this.objectRequest.emit(data.data)
      })

    this.dashboardEmployeeService.getVacations()
      .subscribe((data: any) => {
        this.objectVacations.emit(data.data)
      })

    const myLayoffs: Estadistics[] = [];
    this.objectMyLayoffs.emit(myLayoffs[0]);

    const myInterestsLayoffs: Estadistics[] = [];    
    this.objectMyInterestsLayoffs.emit(myInterestsLayoffs[0]);

    const income: Estadistics[] = [];
    this.objectIncome.emit(income[0]);

    const deductions: Estadistics[] = [];
    this.objectDeductions.emit(deductions[0]);    

    this.dashboardEmployeeService.getNewspaper()
      .subscribe((data: any) => {
        if (data.success === true) {
          this.objectNewspaper.emit(data.data);
        }
      });

    this.dashboardEmployeeService.getEventsEmployee()
      .subscribe((data: any) => {
        if (data.success === true) {
          this.objectAnniversay.emit(data.data[0].anniversaries);
          this.objectBirthDay.emit(data.data[0].birthdays);
          this.objectNewEmployee.emit(data.data[0].new_employees);
        }
      });

    const calendar: Calendar[] = [];

    this.objectCalendar.emit(calendar[0]);
  }

}
