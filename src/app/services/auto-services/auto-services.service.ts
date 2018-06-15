import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class AutoServicesService {

  constructor(public http: HttpClient,
    private tokenService: Angular2TokenService) { }

  getLaboralCertificate() {
    return this.tokenService.get('selfservices/labor_certificates')
      .map((data: any) => data.json());
  }

  getHolidayLetter() {
    return this.tokenService.get('selfservices/holiday_letter')
      .map((data: any) => data.json());
  }
  getPayRollReceipts() {
    return this.tokenService.get('selfservices/payroll_receipts')
      .map((data: any) => data.json());
  }

  getIncomeWithHolding() {
    return this.tokenService.get('selfservices/certificate_income_withholding')
      .map((data: any) => data.json());
  }

  getLaboralCertificateQR(id: string) {
    return this.tokenService.get('selfservices/pdf_with_verification_code/' + id)
      .map((data: any) => data.json());
  }


}
