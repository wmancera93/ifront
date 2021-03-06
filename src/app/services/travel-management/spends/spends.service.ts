import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';


@Injectable()
export class SpendsService {

  constructor(private tokenService: Angular2TokenService, public http: HttpClient) { }

  getSpendsRequest() {
    return this.tokenService.get('travel_allowance_requests')
      .map((data: any) => data.json());
  }
  getMySpendsRequest() {
    return this.tokenService.get('travel_allowance_requests/my_travels_allowances_requests')
      .map((data: any) => data.json());
  }
  getSpendsTypes(type_spend) {
    return this.tokenService.get('travel_requests/allowance_type_for_select/' + type_spend)
      .map((data: any) => data.json());
  }

  getViewDetailSpends(idSpend: string, edit: boolean) {
    return this.tokenService.get('travel_allowance_requests/' + idSpend + '/' + edit)
      .map((data: any) => data.json());
  }

  getSpendListTravel(idEmployee) {
    return this.tokenService.get('travel_requests/index_for_select_allowances/' + idEmployee)
      .map((data: any) => data.json());
  }
  getSpendMoneyList() {
    return this.tokenService.get('travel_requests/currency_for_select')
      .map((data: any) => data.json());
  }

  postSpendData(objectSpend: any) {
    return this.tokenService.post('travel_allowance_requests', objectSpend)
      .map((data: any) => data.json());
  }

  deleteSpendData(idDelete) {
    return this.tokenService.delete('travel_allowance_requests/' + idDelete)
      .map((data: any) => data.json());
  }

  deleteDetailSpend(idEdit) {
    return this.tokenService.delete('travel_allowances/destroy_allowance/' + idEdit)
      .map((data: any) => data.json());
  }

  getDetailSpendEdit(idEdit) {
    return this.tokenService.get('travel_allowances/' + idEdit)
      .map((data: any) => data.json());
  }

  deleteFileSpendData(idFile) {
    return this.tokenService.delete('travel_allowances/destroy_anexed/' + idFile)
      .map((data: any) => data.json());
  }
  putSendRequestsSpend(id_spend_requests) {
    return this.tokenService.put('travel_allowance_requests/send_request_to_approve/' + id_spend_requests, {})
      .map((data: any) => data.json());
  }
  getTypesDocument() {
    return this.tokenService.get('planning_travel_requests/all_types_documents')
      .map((data: any) => data.json());
  }
  getExportSpendExcel(id: string) {
    return this.tokenService.get('travel_requests/expense_reporting?travel_request_id=' + id)
      .map((data: any) => data);
  }
  getAccountContable() {
    return this.tokenService.get('travel_requests/accounting_accounts_allowawnces')
      .map((data: any) => data.json());
  }
  getDetailDistCost(id_spend) {
    return this.tokenService.get('cost_distribution_allowance/' + id_spend)
      .map((data: any) => data.json());
  }
  deleteDetailDistCost(id_dist_spend) {
    return this.tokenService.delete('cost_distribution_allowance/' + id_dist_spend)
      .map((data: any) => data.json());
  }
  postSpendDistributionsCost(objectDistrCost: any) {
    return this.tokenService.post('cost_distribution_allowance', objectDistrCost)
      .map((data: any) => data.json());
  }
  getMessageSynchSpend(id) {
    return this.tokenService.get('travel_allowance_request_synch_servers/index_allowance_synch_server/' + id)
      .map((data: any) => data.json());
  }
}
