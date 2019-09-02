import { Component, OnInit } from '@angular/core';
import { SpendSharedService } from '../../../../services/shared/spend-shared/spend-shared.service';
import { SpendsService } from '../../../../services/travel-management/spends/spends.service';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';
import { Alerts } from '../../../../models/common/alerts/alerts';
import { AlertsService } from '../../../../services/shared/common/alerts/alerts.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dist-spend',
  templateUrl: './dist-spend.component.html',
  styleUrls: ['./dist-spend.component.css'],
})
export class DistSpendComponent implements OnInit {
  public id_spend: string;
  public id_dist_spend: string;
  public detailDistCost: any[] = [];
  public printSpend: any[] = [];
  public isEdit = false;
  public center_costs_travels: any[] = [];
  public grahp: any[] = [];
  public costs_travels: any[] = [];
  public showListAutoCost = false;
  public showListAutoGraph = false;
  public operations: any[] = [];
  public accountContable: any[] = [];
  public distributionAccount: any[] = [];
  public elementImputation: string;
  public typeCenterCost: string;
  public grahpSpend: string;
  public operationsSpend: string;
  public accountContableVariable: string;
  public distribution: string;
  public typeCenterCost_id = '';
  public grahpSpend_id = '';
  public kostl = true;
  public nplnr = false;
  public is_collapse = true;
  public accionDist: boolean;
  public aufnr = false;
  public typeCenterOrder = '';
  public typeCenterOrder_id = '';
  public showListAutoOrder = false;
  public order_travels: any[] = [];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.travel_management.spend.dist_spend.${key}`;
  }

  constructor(
    public spendSharedService: SpendSharedService,
    public spendsService: SpendsService,
    public travelManagementService: TravelService,
    public alert: AlertsService,
    public translate: TranslateService,
  ) {
    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data === 'confirmContinueDist' || data === 'editDitsCost') {
        this.spendsService
          .getDetailDistCost(this.id_spend)
          .subscribe((result: any) => {
            this.detailDistCost = result.data[0].cost_distribution;
            this.printSpend = result.data[0].travel_allowance;
          });
        if (document.getElementById('dist_spend').className !== 'modal show') {
          document.getElementById('btn_detail_distSpend').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
        this.is_collapse = true;
        document.getElementById('funtionNewSpend').click();
      }
      if (data === 'confirmContinueDistDelete') {
        this.spendsService
          .getDetailDistCost(this.id_spend)
          .subscribe((result: any) => {
            this.detailDistCost = result.data[0].cost_distribution;
            this.printSpend = result.data[0].travel_allowance;
          });
        if (document.getElementById('dist_spend').className !== 'modal show') {
          document.getElementById('btn_detail_distSpend').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
      }
    });

    this.spendSharedService.getViewDistCostSpend().subscribe((data: any) => {
      this.accionDist = data.accion;

      if (document.getElementById('dist_spend').className !== 'modal show') {
        document.getElementById('btn_detail_distSpend').click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
      if (!data.accion) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
      this.id_spend = data.id;
      this.spendsService
        .getDetailDistCost(this.id_spend)
        .subscribe((result: any) => {
          this.detailDistCost = result.data[0].cost_distribution;
          this.printSpend = result.data[0].travel_allowance;
        });
    });
  }

  ngOnInit() {
    this.travelManagementService
      .getplanningTravelRequests()
      .subscribe((data: any) => {
        this.center_costs_travels = this.sortByAphabet(
          data.data.travel_costs_types,
        );
      });
    this.spendsService.getAccountContable().subscribe((account: any) => {
      this.accountContable = this.sortByAphabet(account.data);
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
    this.typeCenterOrder = '';
    this.typeCenterOrder_id = '';
  }

  saveAccountEdit() {
    const objectCostDist = {
      travel_allowance_id: this.id_spend,
      travel_costs_types_id: this.center_costs_travels.filter(
        data => data.code === this.elementImputation,
      )[0].id,
      travel_operations_id: this.operationsSpend,
      accounting_account_id: this.accountContableVariable,
      distribution: this.distribution,
      travel_graphs_id: this.grahpSpend_id,
      travel_costs_id: this.typeCenterCost_id,
      travel_maintenance_order_id: this.typeCenterOrder_id,
    };
    this.spendsService.postSpendDistributionsCost(objectCostDist).subscribe(
      (dist: any) => {
        document.getElementById('btn_detail_distSpend').click();
        const alertWarning: Alerts[] = [
          {
            type: 'success',
            title: this.t('type_alert_ts'),
            message: dist.message + this.t('message_alert_ts'),
            confirmation: true,
            typeConfirmation: 'confirmContinueDist',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      },
      (error: any) => {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('type_alert_one_ts'),
            message: error.json().errors.toString(),
            confirmation: true,
            typeConfirmation: 'editDitsCost',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      },
    );
  }
  selectTypeCenterImputations() {
    if (this.elementImputation === 'KOSTL') {
      this.kostl = true;
      this.nplnr = false;
      this.aufnr = false;
    } else {
      if (this.elementImputation === 'NPLNR') {
        this.kostl = false;
        this.nplnr = true;
        this.aufnr = false;
      } else {
        if (this.elementImputation === 'AUFNR') {
          this.kostl = false;
          this.nplnr = false;
          this.aufnr = true;
        }
      }
    }
  }

  sortByAphabet(dataBySort: any) {
    dataBySort.sort(function(a, b) {
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
    this.travelManagementService
      .getFilterTravelCost(
        this.center_costs_travels.filter(
          data => data.code === this.elementImputation,
        )[0].id,
        this.typeCenterCost,
      )
      .subscribe((data: any) => {
        this.costs_travels = this.sortByAphabet(data.data);
        this.showListAutoCost = true;
      });
  }
  enterGraphSpend() {
    this.travelManagementService
      .getFilterGraphs(
        this.center_costs_travels.filter(
          data => data.code === this.elementImputation,
        )[0].id,
        this.grahpSpend,
      )
      .subscribe((data: any) => {
        this.grahp = this.sortByAphabet(data.data);
        this.showListAutoCost = false;
        this.showListAutoGraph = true;
      });
  }
  enterOrderSpend() {
    this.travelManagementService
      .getFilterTravelOrders(this.typeCenterOrder.toUpperCase())
      .subscribe((data: any) => {
        this.order_travels = this.sortByAphabet(data.data);
        this.showListAutoCost = false;
        this.showListAutoGraph = false;
        this.showListAutoOrder = true;
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
    this.searchOperationsGrahp(graph.code, 'edit');
  }
  returnOrderSearchOrder(order: any) {
      
    this.typeCenterOrder = order.code + '-' + order.name;
    this.order_travels = [];
    this.typeCenterOrder_id = order.id;
  }
  searchOperationsGrahp(graphCode: any, acction: any) {
    this.travelManagementService
      .getTravelsOperations(graphCode)
      .subscribe((data: any) => {
        this.operations = this.sortByAphabet(data.data);
        if (this.operations.length > 0) {
          if (acction === 'new') {
            this.operationsSpend = '-1';
          }
        } else {
          this.operationsSpend = '';
        }
      });
  }
  closeCollapse() {
    this.is_collapse = true;
  }
  deletesSavedDist(pinterDistributions) {
    this.spendsService.deleteDetailDistCost(pinterDistributions.id).subscribe(
      (data: any) => {
        document.getElementById('btn_detail_distSpend').click();
        const alertWarning: Alerts[] = [
          {
            type: 'success',
            title: this.t('type_alert_ts'),
            message: data.message,
            confirmation: true,
            typeConfirmation: 'confirmContinueDistDelete',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      },
      (error: any) => {
        const alertWarning: Alerts[] = [
          {
            type: 'danger',
            title: this.t('type_alert_one_ts'),
            message: error.json().errors.toString(),
            confirmation: true,
            typeConfirmation: 'editDitsCost',
          },
        ];
        this.alert.setAlert(alertWarning[0]);
      },
    );
  }

  returnSpend() {
    if (this.accionDist === false) {
      if (
        document.getElementById('modal_viewSpends').className !== 'modal show'
      ) {
        document.getElementById('closeDistSpend').click();
        setTimeout(() => {
          document.getElementById('btn-viewSpends').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }, 100);

        this.printSpend = [];
        this.detailDistCost = [];
      }
    } else {
      if (document.getElementById('spend_edit').className !== 'modal show') {
        document.getElementById('closeDistSpend').click();
        setTimeout(() => {
          document.getElementById('btn_spend_edit').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }, 100);

        this.printSpend = [];
        this.detailDistCost = [];
      }
    }
  }
}
