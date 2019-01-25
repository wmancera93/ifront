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

  getTrainingAgreementsReport(personal_number: any, code: any, status_id: any, date_begin: any, date_end: any) {
    return this.tokenService.get('training_events/management_report/' + personal_number + '/' + code + '/' + status_id + '/' + date_begin + '/' + date_end)
    .map((data: any) => data.json());
  }

  getTrainingAgreementsReportExcel(id_employee: any, personal_number: any, code: any, status_id: any, date_begin: any, date_end: any) {
    return this.tokenService.get('training_events/management_report_export/' + id_employee + '/' + personal_number + '/' + code + '/' + status_id + '/' + date_begin + '/' + date_end)
    .map((data: any) => data);
  }

}

