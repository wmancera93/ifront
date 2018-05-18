import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class EvaluationsService {

  constructor( private tokenService: Angular2TokenService) { }

  getEvaluationList() {

    return this.tokenService.get('evaluations')
      .map((data: any) => data.json());
  }

}

