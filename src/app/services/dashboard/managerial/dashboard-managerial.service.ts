import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';
import { EventsEmployess } from '../../../models/common/widgets/widgets';

@Injectable()
export class DashboardManagerialService {

  constructor(private http: HttpClient) { }
getWidgetEmployeeOnVacations(){
 return this.http.get(environment.apiBaseHr+'/api/v2/dashboards/total_employees_in_vacations_widget')
 .map((data:Observable<any>)=>data);
}

getWidgetEmployeeOnPermition()
{
  return this.http.get(environment.apiBaseHr+'/api/v2/dashboards/total_employees_in_permissions_widget')
  .map((data:Observable<any>)=>data);
}

getwidgetEmployeeOnAbsences()
{
  return this.http.get(environment.apiBaseHr+'/api/v2/dashboards/total_employees_in_absences_widget')
  .map((data:Observable<any>)=>data);
}
getWidgetMyteam()
{
  return this.http.get(environment.apiBaseHr+'/api/v2/dashboards/my_team_widget')
  .map((data:Observable<any>)=>data);
}
getWidgetCompanyrequest(){
  return this.http.get(environment.apiBaseHr+'/api/v2/dashboards/company_requests_widget')
  .map((data:Observable<any>)=>data);  
}
getWidgetPermissionsUser()
{
  return this.http.get(environment.apiBaseHr+'/api/v2/dashboards/roles_and_permissions_widget')
  .map((data:Observable<any>)=>data);
}
}

