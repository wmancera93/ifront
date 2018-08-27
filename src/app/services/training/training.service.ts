import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class TrainingService {

  constructor(private tokenService: Angular2TokenService) { }

  getTrainingEvents() {
    return this.tokenService.get('training_events')
      .map((data: any) => data.json());
  }

  getTrainingEventsByID(id) {
    return this.tokenService.get('training_events/' + id)
      .map((data: any) => data.json());
  }

  putTrainingEventsByID(id, objectEdit) {
    return this.tokenService.put('training_events/' + id, objectEdit)
      .map((data: any) => data.json());
  }


}

