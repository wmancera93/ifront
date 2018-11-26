import { Component, OnInit } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';

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
    public travelManagementService: TravelService, public alert: AlertsService) {


    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'confirmContinueDist' || data === 'editDitsCost') {
        this.spendsService.getDetailDistCost(this.id_spend).subscribe((result: any) => {
          this.detailDistCost = result.data[0].cost_distribution;
          this.printSpend = result.data[0].travel_allowance;
        })
        if (document.getElementById('dist_spend').className !== 'modal show') {
          document.getElementById('btn_detail_distSpend').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
        this.is_collapse = true;
        document.getElementById('funtionNewSpend').click();
      }
      if (data === 'confirmContinueDistDelete') {
        this.spendsService.getDetailDistCost(this.id_spend).subscribe((result: any) => {
          this.detailDistCost = result.data[0].cost_distribution;
          this.printSpend = result.data[0].travel_allowance;
        })
        if (document.getElementById('dist_spend').className !== 'modal show') {
          document.getElementById('btn_detail_distSpend').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }
      }

    });

    this.spendSharedService.getViewDistCostSpend().subscribe((data: any) => {
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
    this.elementImputation = '';
    this.typeCenterCost = '';
    this.grahpSpend = '';
    this.operationsSpend = '';
    this.accountContableVariable = '';
    this.distribution = '';
    this.grahpSpend_id = '';
    this.typeCenterCost_id = '';
  }


  saveAccountEdit() {
    let objectCostDist = {
      travel_allowance_id: this.id_spend,
      travel_costs_types_id: this.center_costs_travels.filter(data => data.code === this.elementImputation)[0].id,
      travel_operations_id: this.operationsSpend,
      accounting_account_id: this.accountContableVariable,
      distribution: this.distribution,
      travel_graphs_id: this.grahpSpend_id,
      travel_costs_id: this.typeCenterCost_id,
    }
    this.spendsService.postSpendDistributionsCost(objectCostDist).subscribe(
      (dist: any) => {
        document.getElementById('btn_detail_distSpend').click();
        const alertWarning: Alerts[] = [{
          type: 'success',
          title: 'Confirmación',
          message: dist.message + ' ¿desea continuar modificando la distribucion de elementos de imputación?',
          confirmation: true,
          typeConfirmation: 'confirmContinueDist'
        }];
        this.alert.setAlert(alertWarning[0]);
      },
      (error: any) => {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: error.json().errors.toString(),
          confirmation: true,
          typeConfirmation: 'editDitsCost'
        }];
        this.alert.setAlert(alertWarning[0]);
      })
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
  closeCollapse() {
    this.is_collapse = true;
  }
  deletesSavedDist(pinterDistributions) {
    this.spendsService.deleteDetailDistCost(pinterDistributions.id).subscribe((data: any) => {

      document.getElementById('btn_detail_distSpend').click();
      const alertWarning: Alerts[] = [{
        type: 'success',
        title: 'Confirmación',
        message: data.message,
        confirmation: true,
        typeConfirmation: 'confirmContinueDistDelete'
      }];
      this.alert.setAlert(alertWarning[0]);

    },
      (error: any) => {
        const alertWarning: Alerts[] = [{
          type: 'danger',
          title: 'Advertencia',
          message: error.json().errors.toString(),
          confirmation: true,
          typeConfirmation: 'editDitsCost'
        }];
        this.alert.setAlert(alertWarning[0]);
      })
  }


}
