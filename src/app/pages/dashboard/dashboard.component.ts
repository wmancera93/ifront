import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Employee } from '../../models/general/user';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { UserSharedService } from '../../services/shared/common/user/user-shared.service';
import { environment } from '../../../environments/environment';
import { NotificationPrimary, NotificationSecundary, Estadistics, Calendar, Newspaper, EventsEmployess } from '../../models/common/widgets/widgets';
import { Enterprise } from '../../models/general/enterprise';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() objectRequest: NotificationPrimary;
  @Output() objectVacations: NotificationSecundary;
  @Output() objectMyLayoffs: Estadistics;
  @Output() objectMyInterestsLayoffs: Estadistics;
  @Output() objectIncome: Estadistics;
  @Output() objectDeductions: Estadistics;
  @Output() objectCalendar: Calendar;
  @Output() objectNewspaper: Newspaper[];
  @Output() objectBirthDay: EventsEmployess[];
  @Output() objectAnniversay: EventsEmployess[];
  @Output() objectNewEmployee: EventsEmployess[];

  public userAuthenticated: User = null;
  public authdata: any;

  constructor(private tokenService: Angular2TokenService,
    public userSharedService: UserSharedService,
    public router: Router) {
    this.tokenService.init(
      {
        apiBase: environment.apiBaseHr,
        apiPath: 'api/v2',
        signInPath: 'auth/sign_in',
        signOutPath: 'auth/sign_out',
        validateTokenPath: 'auth/validate_token',
        signOutFailedValidate: false,
        registerAccountPath: 'auth/password/new',
        updatePasswordPath: 'auth/password',
        resetPasswordPath: 'auth/password',
        globalOptions: {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      }
    );
    this.userSharedService.getUser().subscribe((data) => {
      this.userAuthenticated = data;
      if (this.userAuthenticated !== null || this.userAuthenticated !== undefined) {
        this.getDataLocalStorage();
      }
    })

    setTimeout(() => {
      setInterval(() => {
       
        (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[0]).click();
      }, 3000)
      setInterval(() => {
       
        (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[1]).click();
        (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[2]).click();
        (<HTMLInputElement>document.getElementsByClassName('carousel-control-next')[3]).click();
      }, 10000)
    }, 10000)
  }

  getDataLocalStorage() {
    if (this.userAuthenticated === null || this.userAuthenticated === undefined) {
      this.userAuthenticated = JSON.parse(localStorage.getItem("user"));
    }
  }

  ngOnInit() {
    const request: NotificationPrimary[] = [];
    request.push({
      title: 'Solicitudes',
      number: '1',
      comment: 'por gestionar',
      icon: 'fa fa-thumbs-up',
      colorIcon: '#FFFFFF',
      background: '#de7e35',
      color: '#FFFFFF'
    });
    this.objectRequest = request[0];

    const vacations: NotificationSecundary[] = [];
    vacations.push({
      title: 'Vacaciones',
      number: '15',
      comment: 'Mis dias de',
      iconPrimary: 'fa fa-globe',
      iconSecundary: 'fa fa-plane',
      colorIconPrimary: '#33446e',
      colorIconSecundary: '#de7e35',
      color: '#33446e',
      background: '#FFFFFF'
    });
    this.objectVacations = vacations[0];

    const myLayoffs: Estadistics[] = [];
    myLayoffs.push({
      title: 'Mis cesantías',
      number: '66.67',
      comment: 'Aumento cesantías',
      canvas: {},
      color: '#FFFFFF',
      background: '#33446e'
    });
    this.objectMyLayoffs = myLayoffs[0];

    const myInterestsLayoffs: Estadistics[] = [];
    myInterestsLayoffs.push({
      title: 'Mis intereses de cesantías',
      number: '177.77',
      comment: 'Aumento intereses',
      canvas: {},
      color: '#FFFFFF',
      background: '#33446e'
    });
    this.objectMyInterestsLayoffs = myInterestsLayoffs[0];

    const income: Estadistics[] = [];
    income.push({
      title: 'Total ingresos',
      number: '0',
      comment: 'Ultimos 3 periodos',
      canvas: {},
      color: '#FFFFFF',
      background: '#de7e35'
    });
    this.objectIncome = income[0];

    const deductions: Estadistics[] = [];
    deductions.push({
      title: 'Total ingresos',
      number: '126.95',
      comment: 'Ultimos 3 periodos',
      canvas: {},
      color: '#FFFFFF',
      background: '#de7e35'
    });
    this.objectDeductions = deductions[0];

    const calendar: Calendar[] = [];
    calendar.push({
      nameDay: 'Lunes',
      numberDay: '19',
      namemonth: 'Febrero',
      numberYear: '2018',
      color: '#FFFFFF',
      background: '#de7e35'
    });
    this.objectCalendar = calendar[0];

    let objctUser: User = JSON.parse(localStorage.getItem("user"))
    let objctEnterprise: Enterprise = JSON.parse(localStorage.getItem("enterprise"))

    const newspaper: Newspaper[] = [];
    newspaper.push({
      title: 'Los trabajadores independientes también pueden ahorrar sus Cesantías',
      description: 'El contexto económico actual de nuestro país',
      image: { url: objctEnterprise.background_login.url },
      themes: [{ description: 'prueba' }]
    });
    newspaper.push({
      title: 'Pueden ahorrar sus Cesantías',
      description: 'Exige estrategias que den soluciones a'
        + 'necesidades y problemas específicos en los diversos sectores productivos.',
      image: { url: objctEnterprise.background_login.url },
      themes: [
        { description: 'prueba' },
        { description: 'prueba 2' },
        { description: 'prueba 3' }
      ]
    });
    newspaper.push({
      title: 'También pueden ahorrar sus Cesantías',
      description: 'El contexto económico actual de nuestro país – luego de 3 años de desaceleración- ',
      image: { url: objctEnterprise.background_login.url },
      themes: [
        { description: 'prueba' },
        { description: 'prueba 2' },
        { description: 'prueba 3' },
        { description: 'prueba 4' }
      ]
    });
    newspaper.push({
      title: 'También pueden ahorrar sus Cesantías',
      description: 'El contexto económico actual de nuestro país – luego de 3 años de desaceleración- ',
      image: { url: objctEnterprise.background_login.url },
      themes: [
        { description: 'prueba' },
        { description: 'prueba 2' },
        { description: 'prueba 3' },
        { description: 'prueba 4' }
      ]
    });
    newspaper.push({
      title: 'También pueden ahorrar sus Cesantías',
      description: 'El contexto económico actual de nuestro país – luego de 3 años de desaceleración- ',
      image: { url: objctEnterprise.background_login.url },
      themes: [
        { description: 'prueba' },
        { description: 'prueba 2' },
        { description: 'prueba 3' },
        { description: 'prueba 4' }
      ]
    });
    newspaper.push({
      title: 'También pueden ahorrar sus Cesantías',
      description: 'El contexto económico actual de nuestro país – luego de 3 años de desaceleración- ',
      image: { url: objctEnterprise.background_login.url },
      themes: [
        { description: 'prueba' },
        { description: 'prueba 2' },
        { description: 'prueba 3' },
        { description: 'prueba 4' }
      ]
    });
    this.objectNewspaper = newspaper;

    const birthDay: EventsEmployess[] = [];
    birthDay.push({
      nameEvent: 'cumpleaños',
      name: 'Wilmer Mancera',
      event: 'Cumpleaños',
      posicion: 'Director',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-birthday-cake',
      description: '20 de febrero',
      color: '#33446e',
      background: '#FFFFFF'
    });
    birthDay.push({
      nameEvent: 'cumpleaños',
      name: 'Alexis Duque',
      event: 'Cumpleaños',
      posicion: 'Director',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-birthday-cake',
      description: '20 de febrero',
      color: '#33446e',
      background: '#FFFFFF'
    });
    birthDay.push({
      nameEvent: 'cumpleaños',
      name: 'Laura Beltran',
      event: 'Cumpleaños',
      posicion: 'Director',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-birthday-cake',
      description: '20 de febrero',
      color: '#33446e',
      background: '#FFFFFF'
    });
    birthDay.push({
      nameEvent: 'cumpleaños',
      name: 'Juan Contreras',
      event: 'Cumpleaños',
      posicion: 'Director',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-birthday-cake',
      description: '20 de febrero',
      color: '#33446e',
      background: '#FFFFFF'
    });
    this.objectBirthDay = birthDay;

    const anniversary: EventsEmployess[] = [];
    anniversary.push({
      nameEvent: 'aniversario',
      name: 'Nicolas Vargas',
      event: 'Aniversario en RCNTV',
      posicion: 'Operador Video Y Vtr',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-calendar',
      description: 'Ya casi 5 año(s)',
      color: '#33446e',
      background: '#FFFFFF'
    });
    anniversary.push({
      nameEvent: 'aniversario',
      name: 'Jesus Duque',
      event: 'Aniversario en RCNTV',
      posicion: 'Operador Video Y Vtr',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-calendar',
      description: 'Ya casi 5 año(s)',
      color: '#33446e',
      background: '#FFFFFF'
    });
    this.objectAnniversay = anniversary;

    const newEmployee: EventsEmployess[] = [];
    newEmployee.push({
      nameEvent: 'nuevoEmpleado',
      name: 'Enrique Beltran',
      event: 'Nuev@ Compañer@',
      posicion: 'Auxiliar de microondas',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-users',
      description: '20 de febrero',
      color: '#33446e',
      background: '#FFFFFF'
    });
    newEmployee.push({
      nameEvent: 'nuevoEmpleado',
      name: 'David Calderon',
      event: 'Nuev@ Compañer@',
      posicion: 'Auxiliar de microondas',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-users',
      description: '20 de febrero',
      color: '#33446e',
      background: '#FFFFFF'
    });
    newEmployee.push({
      nameEvent: 'nuevoEmpleado',
      name: 'Pablo Vargas',
      event: 'Nuev@ Compañer@',
      posicion: 'Auxiliar de microondas',
      image: { url: objctUser.employee.image.url },
      icon: 'fa fa-users',
      description: '20 de febrero',
      color: '#33446e',
      background: '#FFFFFF'
    });
    this.objectNewEmployee = newEmployee;
    // this.authdata = this.tokenService.currentAuthData;
    // console.log(this.tokenService);
    this.getDataLocalStorage();
    // this.tokenService.validateToken().subscribe(
    //   res => console.log(res),
    //   error => console.log(error)
    // );
       
  }

}
