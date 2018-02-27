import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationSecundary, EventsEmployess, NotificationPrimary, Estadistics, ProgressPrimary } from '../../../models/common/widgets/widgets';
import { User } from '../../../models/general/user';

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
  @Output() objectAbsenteeism: EventEmitter<Estadistics> = new EventEmitter();
  @Output() objectQueryCompany: EventEmitter<ProgressPrimary[]> = new EventEmitter();
  @Output() objectPermissionsUsers: EventEmitter<ProgressPrimary[]> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    const vacations: NotificationSecundary[] = [];
    this.objectVacations.emit(vacations[0]);

    const incapacityes: NotificationSecundary[] = [];
    this.objectIncapacityes.emit(incapacityes[0]);

    const permissions: NotificationSecundary[] = [];
    this.objectPermissions.emit(permissions[0]);

    const myTeam: EventsEmployess[] = [];
    this.objectMyTeam.emit(myTeam);

    const reports: NotificationPrimary[] = [];
    this.objectReports.emit(reports[0]);

    const myQuerysCompany: ProgressPrimary[] = [];
    this.objectQueryCompany.emit(myQuerysCompany);

    const myPermissionsUsers: ProgressPrimary[] = [];
    this.objectPermissionsUsers.emit(myPermissionsUsers);

    const men: NotificationPrimary[] = [];
    this.objectMen.emit(men[0]);

    const woman: NotificationPrimary[] = [];
    this.objectWoman.emit(woman[0]);
  }
}
