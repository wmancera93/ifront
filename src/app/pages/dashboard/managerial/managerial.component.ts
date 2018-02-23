import { Component, OnInit, Output } from '@angular/core';
import { NotificationSecundary, EventsEmployess, NotificationPrimary, Estadistics, ProgressPrimary } from '../../../models/common/widgets/widgets';
import { User } from '../../../models/general/user';

@Component({
  selector: 'app-managerial',
  templateUrl: './managerial.component.html',
  styleUrls: ['./managerial.component.css']
})
export class ManagerialComponent implements OnInit {
  @Output() objectVacations: NotificationSecundary;
  @Output() objectIncapacityes: NotificationSecundary;
  @Output() objectPermissions: NotificationSecundary;
  @Output() objectMyTeam: EventsEmployess[];
  @Output() objectReports: NotificationPrimary;
  @Output() objectWoman: NotificationPrimary;
  @Output() objectMen: NotificationPrimary;  
  @Output() objectAbsenteeism: Estadistics;
  @Output() objectQueryCompany: ProgressPrimary[];
  @Output() objectPermissionsUsers: ProgressPrimary[];  

  constructor() {
    setInterval(() => {
      (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[0]).click();
    }, 5000)
  }

  ngOnInit() {
    const vacations: NotificationSecundary[] = [];
    vacations.push({
      title: 'Vacaciones',
      number: '15',
      comment: 'Personas en',
      iconPrimary: 'fa fa-globe',
      iconSecundary: 'fa fa-plane',
      colorIconPrimary: '#FFFFFF',
      colorIconSecundary: '#de7e35',
      color: '#FFFFFF',
      background: '#33446e'
    });
    this.objectVacations = vacations[0];

    const incapacityes: NotificationSecundary[] = [];
    incapacityes.push({
      title: 'Incapacidad',
      number: '0',
      comment: 'Personas en',
      iconPrimary: 'fa fa-ambulance',
      iconSecundary: 'fa fa-user',
      colorIconPrimary: '#FFFFFF',
      colorIconSecundary: '#de7e35',
      color: '#FFFFFF',
      background: '#33446e'
    });
    this.objectIncapacityes = incapacityes[0];

    const permissions: NotificationSecundary[] = [];
    permissions.push({
      title: 'Permiso',
      number: '2',
      comment: 'Personas en',
      iconPrimary: 'fa fa-users',
      iconSecundary: 'fa fa-check',
      colorIconPrimary: '#FFFFFF',
      colorIconSecundary: '#de7e35',
      color: '#FFFFFF',
      background: '#33446e'
    });
    this.objectPermissions = permissions[0];

    let objctUser: User = JSON.parse(localStorage.getItem("user"))

    const myTeam: EventsEmployess[] = [];
    myTeam.push({
      nameEvent: 'miEquipo',
      name: 'Wilmer Mancera',
      event: 'Mi Equipo',
      posicion: 'Director',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-users',
      description: '',
      color: '#33446e',
      background: '#FFFFFF'
    });
    myTeam.push({
      nameEvent: 'miEquipo',
      name: 'Alexis Duque',
      event: 'Mi Equipo',
      posicion: 'Director',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-users',
      description: '',
      color: '#33446e',
      background: '#FFFFFF'
    });
    myTeam.push({
      nameEvent: 'miEquipo',
      name: 'Laura Beltran',
      event: 'Mi Equipo',
      posicion: 'Director',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-users',
      description: '',
      color: '#33446e',
      background: '#FFFFFF'
    });
    myTeam.push({
      nameEvent: 'miEquipo',
      name: 'Juan Contreras',
      event: 'Mi Equipo',
      posicion: 'Director',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-users',
      description: '',
      color: '#33446e',
      background: '#FFFFFF'
    });
    this.objectMyTeam = myTeam;

    const reports: NotificationPrimary[] = [];
    reports.push({
      title: 'Ausentismos',
      number: '15%',
      comment: 'hoy',
      icon: 'fa fa-user-times',
      colorIcon: '#FFFFFF',
      background: '#de7e35',
      color: '#FFFFFF'
    });
    this.objectReports = reports[0];

    const myQuerysCompany: ProgressPrimary[] = [];
    myQuerysCompany.push({
      title: 'Solicitudes Compañia',
      nameProgress: 'En proceso',
      numberProgress: '30',
      percentProgress: '30%',
      iconProgress: 'fa fa-cog'
    });
    myQuerysCompany.push({
      title: 'Solicitudes Compañia',
      nameProgress: 'Cancelado',
      numberProgress: '11',
      percentProgress: '11%',
      iconProgress: 'fa fa-ban '
    });
    myQuerysCompany.push({
      title: 'Solicitudes Compañia',
      nameProgress: 'Pendiente',
      numberProgress: '15',
      percentProgress: '15%',
      iconProgress: 'fa fa-hourglass-start'
    });
    myQuerysCompany.push({
      title: 'Solicitudes Compañia',
      nameProgress: 'Aprobado',
      numberProgress: '80',
      percentProgress: '80%',
      iconProgress: 'fa fa-check-circle'
    });
    this.objectQueryCompany = myQuerysCompany;

    const myPermissionsUsers: ProgressPrimary[] = [];
    myPermissionsUsers.push({
      title: 'Permisos de usuarios',
      nameProgress: 'Con permisos',
      numberProgress: '30',
      percentProgress: '30%',
      iconProgress: 'fa fa-check-circle'
    });
    myPermissionsUsers.push({
      title: 'Permisos de usuarios',
      nameProgress: 'Sin permisos',
      numberProgress: '70',
      percentProgress: '70%',
      iconProgress: 'fa fa-ban'
    });
    myPermissionsUsers.push({
      title: 'Permisos de usuarios',
      nameProgress: 'Crear contenidos',
      numberProgress: '10',
      percentProgress: '10%',
      iconProgress: 'fa fa-bullhorn'
    });
    myPermissionsUsers.push({
      title: 'Permisos de usuarios',
      nameProgress: 'Reporte gerencial',
      numberProgress: '5',
      percentProgress: '5%',
      iconProgress: 'fa fa-users'
    });
    myPermissionsUsers.push({
      title: 'Permisos de usuarios',
      nameProgress: 'Ver Organigrama',
      numberProgress: '90',
      percentProgress: '90%',
      iconProgress: 'fa fa-sitemap'
    });
    myPermissionsUsers.push({
      title: 'Permisos de usuarios',
      nameProgress: 'Administrador',
      numberProgress: '3',
      percentProgress: '3%',
      iconProgress: 'fa fa-user-circle'
    });
    this.objectPermissionsUsers = myPermissionsUsers;

    const men: NotificationPrimary[] = [];
    men.push({
      title: 'Personal',
      number: '19%',
      comment: '3 Hombres',
      icon: 'fa fa-male',
      colorIcon: '#FFFFFF',
      background: '#de7e35',
      color: '#FFFFFF'
    });
    this.objectMen = men[0];

    const woman: NotificationPrimary[] = [];
    woman.push({
      title: 'Personal',
      number: '81%',
      comment: '13 Mujeres',
      icon: 'fa fa-female',
      colorIcon: '#FFFFFF',
      background: '#de7e35',
      color: '#FFFFFF'
    });
    this.objectWoman = woman[0];
  }
}
