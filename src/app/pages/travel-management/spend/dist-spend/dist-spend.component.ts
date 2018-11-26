import { Component, OnInit } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';

@Component({
  selector: 'app-dist-spend',
  templateUrl: './dist-spend.component.html',
  styleUrls: ['./dist-spend.component.css']
})
export class DistSpendComponent implements OnInit {

  public id_spend: string;
  public id_dist_spend: string;
  public detailDistCost: any[] = [];
  public printSpend: any[] = [];
  public isEdit: boolean = false;
  public center_costs_travels: any[] = [];
  public grahp: any[] = [];
  public costs_travels: any[] = [];
  public showListAutoCost: boolean = false;
  public showListAutoGraph: boolean = false;
  public operations: any[] = [];
  public accountContable: any[] = [];
  public distributionAccount: any[] = [];
  public elementImputation: string;
  public typeCenterCost: string;
  public grahpSpend: string;
  public operationsSpend: string;
  public accountContableVariable: string;
  public distribution: string;
  public typeCenterCost_id: string = '';
  public grahpSpend_id: string = '';
  public kostl: boolean = true;
  public nplnr: boolean = false;
  public is_collapse: boolean = true;

  constructor(public spendSharedService: SpendSharedService, public spendsService: SpendsService,
    public travelManagementService: TravelService) {

    this.spendSharedService.getViewDistCostSpend().subscribe((data: any) => {
      debugger
      if (document.getElementById('dist_spend').className !== 'modal show') {
        document.getElementById('btn_detail_distSpend').click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }
      if (!data.accion) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
      this.id_spend = data.id;
      this.spendsService.getDetailDistCost(this.id_spend).subscribe((result: any) => {
        this.detailDistCost = result.data[0].cost_distribution;
        this.printSpend = result.data[0].travel_allowance;
      })
    });
  }

  ngOnInit() {

    this.travelManagementService.getplanningTravelRequests().
      subscribe((data: any) => {
        this.center_costs_travels = this.sortByAphabet(data.data.travel_costs_types);
      });
    this.spendsService.getAccountContable().
      subscribe((account: any) => {
        this.accountContable = account.data;
      });
  }

  newDistributions() {
    document.getElementById('funtionNewSpend').click();
    this.is_collapse = false;
    let objectCostDist = {
      travel_allowance_id: this.id_spend,
      travel_costs_types_id:this.elementImputation,
      travel_operations_id:this.operationsSpend,
      accounting_accounts_id:this.accountContableVariable,
      distribution:this.distribution,
      travel_graphs_id:this.grahpSpend_id,
    }
    this.spendsService.postSpendDistributionsCost(objectCostDist).subscribe((dist: any) => {

    });

  }
  selectTypeCenterImputations() {

    if (this.elementImputation === 'KOSTL') {
      this.kostl = true;
      this.nplnr = false;
    } else {
      this.kostl = false;
      this.nplnr = true;
    }
  }

  sortByAphabet(dataBySort: any) {
    dataBySort.sort(function (a, b) {
      const nameA: String = a.name.toLowerCase();
      const nameB: String = b.name.toLowerCase();

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });

    return dataBySort;
  }

  enterCostSpend() {

    this.travelManagementService.getFilterTravelCost(this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id, this.typeCenterCost).
      subscribe((data: any) => {
        this.costs_travels = this.sortByAphabet(data.data);
        this.showListAutoCost = true;
      });
  }

  enterGraphSpend() {
    this.travelManagementService.getFilterGraphs(this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id, this.grahpSpend).
      subscribe((data: any) => {
        this.grahp = this.sortByAphabet(data.data);
        this.showListAutoCost = false;
        this.showListAutoGraph = true;
      });
  }

  returnCostSearchSpend(cost: any) {
    this.typeCenterCost = cost.code + '-' + cost.name;
    this.typeCenterCost_id = cost.id;
    this.costs_travels = [];
  }

  returnGraphSearchSpend(graph: any) {
    this.grahpSpend = graph.code + '-' + graph.name;
    this.grahp = [];
    this.grahpSpend_id = graph.id;
    this.searchOperationsGrahp(graph.code, 'edit')
  }

  searchOperationsGrahp(graphCode: any, acction: any) {

    this.travelManagementService.getTravelsOperations(graphCode).
      subscribe((data: any) => {
        this.operations = this.sortByAphabet(data.data);
        if (this.operations.length > 0) {
          if (acction === 'new') {
            this.operationsSpend = '-1';
          }
        } else {
          this.operationsSpend = '';
        }
      })
  }

  countSaveAccount: number = 0;
  saveAccountEdit() {
    debugger
    this.detailDistCost.push({
      id: this.countSaveAccount += 1,
      travel_costs_id: this.typeCenterCost_id,
      travel_graphs_id: this.grahpSpend_id,
      travel_costs_types_id: this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id,
      travel_operations_id: this.operationsSpend,
      accounting_accounts_id: this.accountContableVariable,
      distribution: this.distribution,
      element_imputation: this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].name,
      center_cost: this.typeCenterCost === '' ? 'N/A' : this.typeCenterCost,
      graph_code: this.grahpSpend === '' ? 'N/A' : this.grahpSpend,
      operations: this.operationsSpend === '' ? 'N/A' : this.operations.filter(data => data.id.toString() === this.operationsSpend.toString())[0].name,
      // account_contable: this.accountContableVariable + '- prueb'
      account_contable: this.accountContable.filter(data => data.id.toString() === this.accountContableVariable)[0].name,
    })

    this.elementImputation = '';
    this.grahpSpend_id = '';
    this.typeCenterCost = '';
    this.typeCenterCost_id = '';
    this.grahpSpend = '';
    this.distribution = '';
    this.operationsSpend = '';
    this.accountContableVariable = '';
  }
  closeCollapse() {
    this.is_collapse = true;
  }
  deletesSavedDist(pinterDistributions) {
    debugger
    this.spendsService.deleteDetailDistCost(pinterDistributions.id).subscribe((data: any) => {
    })
  }

  // newSpend(param) {

  //   this.showSubmit = false;

  //   const spendsFormData = new FormData();
  //   spendsFormData.append('travel_request_id', param.travel_request_id.toString());
  //   spendsFormData.append('allowances', JSON.stringify(this.objectAllowances));
  //   spendsFormData.append('files_length', this.imgSpend.length.toString())
  //   spendsFormData.append('employee_id', this.eployee_selected == null ? '' : this.eployee_selected.id.toString());
  //   for (let index = 0; index < this.imgSpend.length; index++) {
  //     spendsFormData.append('files_' + (index + 1).toString(), this.file[index]);
  //   };

  //   param = spendsFormData;
  //   this.formDataService.postSpendsFormData(spendsFormData).subscribe(
  //     (data: any) => {
  //       this.ticket_allowance_request = data.data.travel_allowance_request_a.id
  //       document.getElementById("closeSpends").click();
  //       this.spendsService.getSpendListTravel(this.eployee_selected).subscribe((travel: any) => {
  //         this.listTravelsFromSpend = travel.data;
  //       });

  //       const alertSuccess: Alerts[] = [{
  //         type: 'success',
  //         title: 'Alerta',
  //         message: data.message,
  //         confirmation: false
  //       }];
  //       this.showSubmit = true;
  //       this.collapse_is = false;
  //       this.alert.setAlert(alertSuccess[0]);
  //       this.spendSharedService.setRefreshSpend({ success: true, third: this.eployee_selected == null ? false : true });
  //     },
  //     (error: any) => {
  //       document.getElementById("btn_spend_new").click();
  //       const alertWarning: Alerts[] = [{
  //         type: 'danger',
  //         title: 'Advertencia',
  //         message: error.json().errors.toString(),
  //         confirmation: true,
  //         typeConfirmation: 'ValidationNewSpend'
  //       }];
  //       this.showSubmit = true;
  //       this.collapse_is = false;
  //       this.alert.setAlert(alertWarning[0]);
  //     })
  // }

}
