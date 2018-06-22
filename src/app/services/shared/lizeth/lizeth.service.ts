import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TypesRequests } from '../../../models/common/requests-rh/requests-rh';
import { Angular2TokenService } from 'angular2-token';
@Injectable()
export class LizethService {
    
  constructor( private tokenService: Angular2TokenService) { }
  
    getEmployeeRequets() {            
      return this.tokenService.get('employee_requets')
      .map((data: any) => data.json());
    }

}
