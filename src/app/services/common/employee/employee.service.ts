import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeByNameByPage(termSearch:string,numberPage:string):Observable<any>{
    termSearch = termSearch.replace(' ', '_')  
    return this.http.get(environment.apiBaseHr+'/api/v2/coworkers_list/search/'+termSearch+'/'+numberPage)
    .map((response:Observable<any>)=> response);

  }


getAllEmployees(numberPage:string):Observable<any>
{
  return this.http.get(environment.apiBaseHr+'/api/v2/coworkers_list/all/'+numberPage)
  .map((data:Observable<any>)=>data)
}

getEmployeeById(id:string):Observable<any>
{
  return this.http.get(environment.apiBaseHr+'/api/v2/employees/'+id)
  .map((data:Observable<any>)=>data)
}

}
