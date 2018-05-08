import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';
import { EventsEmployess } from '../../../models/common/widgets/widgets';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class DashboardManagerialService {

  constructor(private http: HttpClient,
    private tokenService: Angular2TokenService) { }
  getWidgetEmployeeOnVacations() {
    return this.tokenService.get('dashboards/total_employees_in_vacations_widget')
      .map((data: any) => data.json());
  }

  getWidgetEmployeeOnPermition() {
    return this.tokenService.get('dashboards/total_employees_in_permissions_widget')
      .map((data: any) => data.json());
  }

  getwidgetEmployeeOnAbsences() {
    return this.tokenService.get('dashboards/total_requests_to_manage_widget')
      .map((data: any) => data.json());
  }
  getwidgetEmployeeOnIncapacities() {
    return this.tokenService.get('dashboards/total_employees_in_incapacities_widget')
      .map((data: any) => data.json());
  }
  getWidgetMyteam() {
    return this.tokenService.get('dashboards/my_team_widget')
      .map((data: any) => data.json());
  }
  getWidgetCompanyrequest() {
    return this.tokenService.get('dashboards/company_requests_widget')
      .map((data: any) => data.json());
  }
  getWidgetPermissionsUser() {
    return this.tokenService.get('dashboards/roles_and_permissions_widget')
      .map((data: any) => data.json());
  }
  getWidgetMalePercent() {
    return this.tokenService.get('dashboards/total_males_widget')
      .map((data: any) => data.json());
  }
  getWidgetFemalePercent() {
    return this.tokenService.get('dashboards/total_females_widget')
      .map((data: any) => data.json());
  }

  getDataVacationsSubordinates()
  {
    return this.tokenService.get('consultations/vacations_subordinates')
    .map((data: any) => data.json());
  }

  getDataConsultationsSubordinates()
  {
    return this.tokenService.get('consultations/permissions_subordinates')
    .map((data: any) => data.json());    
  }

  getDataIncapacitiesSubordinates()
  {
    return this.tokenService.get('consultations/incapacities_subordinates')
    .map((data: any) => data.json());  
    
  }
}

