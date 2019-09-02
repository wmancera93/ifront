import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';
import { ActivatedRoute } from '@angular/router';

type DataRoute = {
  path: string;
  ns?: string;
  title?: string;
  table: {
    title?: string;
    service: keyof Pick<
      QueriesService,
      | 'getDisabilities'
      | 'getEmbargoes'
      | 'getCompensatedVacations'
      | 'getExtraHours'
      | 'getIncomeWithholdings'
      | 'getPaymentsDeductions'
      | 'getPermissions'
      | 'getLoans'
      | 'getVacationEnjoyed'
      | 'getVacationBalance'
      | 'getSeverances'
      | 'getAniversary'
      | 'getHistoricalPosts'
      | 'getIvaEmployee'
      | 'getAllEvaluationTime'
    >;
    excel: keyof Pick<
      QueriesService,
      | 'getAniversaryExcel'
      | 'getIncomeWithholdingsExcel'
      | 'getPaymentsAndDeductionsExcel'
      | 'getSeverancesExcel'
      | 'getEmbargoesExcel'
      | 'getLoansExcel'
      | 'getEnjoyedVacationExcel'
      | 'getCompensatedVacationExcel'
      | 'getBalanceVacationExcel'
      | 'getPermissionsExcel'
      | 'getDisabilitiesExcel'
      | 'getExtraHoursExcel'
      | 'getHistoricalPositionExcel'
      | 'getIvaMovementsExcel'
      | 'getTimeEvaluationExcel'
    >;
  };
};

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css'],
})
export class QueriesComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public showExcel = true;
  public title = '';
  public titleTable = '';
  public userAuthenticated: User;
  private subscriptions: ISubscription[] = [];
  public joyrideSubscription: ISubscription;
  private steps = ['step_1', 'step_2'];

  private pages: DataRoute[] = [
    {
      path: 'income_withholdings',
      table: {
        excel: 'getIncomeWithholdingsExcel',
        service: 'getIncomeWithholdings',
      },
    },
    {
      path: 'payments_deductions',
      table: {
        excel: 'getPaymentsAndDeductionsExcel',
        service: 'getPaymentsDeductions',
      },
    },
    {
      path: 'severances',
      table: {
        excel: 'getSeverancesExcel',
        service: 'getSeverances',
      },
    },
    {
      path: 'embargoes',
      table: {
        excel: 'getEmbargoesExcel',
        service: 'getEmbargoes',
      },
    },
    {
      path: 'loans',
      table: {
        excel: 'getLoansExcel',
        service: 'getLoans',
      },
    },
    {
      path: 'vacation_enjoyed',
      table: {
        excel: 'getEnjoyedVacationExcel',
        service: 'getVacationEnjoyed',
      },
    },
    {
      path: 'vacation_enjoyed',
      table: {
        excel: 'getCompensatedVacationExcel',
        service: 'getCompensatedVacations',
      },
    },
    {
      path: 'vacation_balance',
      table: {
        excel: 'getBalanceVacationExcel',
        service: 'getVacationBalance',
      },
    },
    {
      path: 'permissions',
      table: {
        excel: 'getPermissionsExcel',
        service: 'getPermissions',
      },
    },
    {
      path: 'disabilities',
      table: {
        excel: 'getDisabilitiesExcel',
        service: 'getDisabilities',
      },
    },
    {
      path: 'extra_hours',
      table: {
        excel: 'getExtraHoursExcel',
        service: 'getExtraHours',
      },
    },
    {
      path: 'historical_posts',
      table: {
        excel: 'getHistoricalPositionExcel',
        service: 'getHistoricalPosts',
      },
    },
    {
      path: 'iva_employee',
      table: {
        excel: 'getIvaMovementsExcel',
        service: 'getIvaEmployee',
      },
    },
    {
      path: 'aniversary',
      table: {
        excel: 'getAniversaryExcel',
        service: 'getAniversary',
      },
    },
  ];

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.queries.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
    private readonly joyrideAppService: JoyrideAppService,
    private readonly activeRoutedService: ActivatedRoute,
  ) {
    this.joyrideSubscription = this.joyrideAppService.onStartTour.subscribe(() => {
      this.joyrideAppService.startTour({ steps: this.steps });
    });

    this.subscriptions.push(
      this.activeRoutedService.firstChild &&
        this.activeRoutedService.firstChild.url.subscribe(([url]) => {
          if (url) {
            this.pages.some(page => {
              if (page.path === url.path) {
                this.servicesPage(page);
                return true;
              }
              return false;
            });
          }
        }),
    );
  }

  servicesPage(data: DataRoute) {
    if (data) {
      const { table, ns = data.path, title }: DataRoute = data;
      const titleDefault = 'name_table_ts';
      this.title = `${ns}.${title || titleDefault}`;
      this.titleTable = `${ns}.${(table && table.title) || titleDefault}`;
      if (table) {
        const { excel, service: tableService } = table;
        this.subscriptions.push(
          this.accionDataTableService.getActionDataTable().subscribe(() => {
            this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
            excel &&
              this.queriesService[excel](this.userAuthenticated.employee_id.toString()).subscribe((info: any) => {
                window.open(info.url);
              });
          }),
          tableService &&
            this.queriesService[tableService]().subscribe(
              (data: any) => {
                this.objectReport.emit(data);
              },
              error => {
                console.log(error.error);
              },
            ),
        );
      }
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription && subscription.unsubscribe();
    });
    this.joyrideSubscription.unsubscribe();
  }
}
