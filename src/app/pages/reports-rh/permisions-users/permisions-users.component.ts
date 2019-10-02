import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { TablesPermisions } from '../../../models/common/tables/tables';
import { PrintDataTableService } from '../../../services/shared/common/print-data-table/print-data-table.service';
import { ExcelService } from '../../../services/common/excel/excel.service';
import { Enterprise } from '../../../models/general/enterprise';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';

@Component({
  selector: 'app-permisions-users',
  templateUrl: './permisions-users.component.html',
  styleUrls: ['./permisions-users.component.css'],
})
export class PermisionsUsersComponent implements OnInit, OnDestroy {
  public permisionsUsers: TablesPermisions[] = [];
  public recordsStatic: TablesPermisions[] = [];
  public title = '';
  public keys: any[] = [];
  public labels: any[] = [];
  public recordsPrint: any[] = [];
  public labelsCell: any[] = [];
  public columnsPdf: any[] = [];

  public p = 1;
  public size_table = 10;
  public show = true;

  public filter_active = 'with_permits';
  public value_search = '';

  public is_collapse = false;
  public placeholder_search: string;
  public token: boolean;
  private subscriptions: ISubscription[];
  private steps = ['step_1', 'step_2', 'step_3', 'step_4', 'step_5', 'step_6', 'step_7_permisions', 'step_8', 'step_9'];

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.reports_rh.permisions_users.${key}`;
  }

  constructor(
    public reportsHrService: ReportsHrService,
    public printDataTableService: PrintDataTableService,
    public excelService: ExcelService,
    private tokenService: Angular2TokenService,
    public router: Router,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
    public joyrideAppService: JoyrideAppService,
  ) {
    this.subscriptions = [
      this.tokenService.validateToken().subscribe(
        () => {
          this.token = false;
        },
        error => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString(),
          });
          document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        },
      ),
    ];
    this.subscriptions.push(
      this.joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(this.joyrideAppService.startTour({ steps: this.steps }));
      }),
    );
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    this.subscriptions = [
      ...this.subscriptions,
      this.reportsHrService.getReportEmployeeRoles().subscribe((res: any) => {
        if (res.success) {
          this.permisionsUsers = res.data;
          const { title_table, labels, data } = res.data[0];
          this.title = title_table ? title_table : this.t('tittle');
          this.labelsCell = labels[0];
          this.recordsPrint = data;
          this.recordsStatic = this.recordsPrint;
          this.keys = Object.keys(this.labelsCell);
          this.keys.forEach(element => {
            const label = labels[0][element];
            this.labels.push({
              value: label.value,
              type: label.type,
              label: element,
            });
            this.columnsPdf.push({
              title: label.value,
              dataKey: element,
            });
          });
        }
        if (res.success) {
          // setTimeout(() => {
          //   document.getElementById("loginId").style.display = 'none'
          //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          // }, 2000)
        }
      }),
    ];

    setTimeout(() => {
      if (this.stylesExplorerService.validateBrowser()) {
        let dataEnterprise: Enterprise;
        dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
        document.getElementById('with_permits').style.backgroundColor = dataEnterprise.primary_color;
      }
    }, 600);

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 400);
  }

  filter(parameter: string) {
    this.reportsHrService.getReportEmployeeRolesByStatus(parameter).subscribe((res: any) => {
      if (res.success) {
        const { title_table, labels, data } = res.data[0];
        this.permisionsUsers = [];
        this.title = '';
        this.labelsCell = [];
        this.recordsPrint = [];
        this.recordsStatic = [];
        this.labels = [];
        this.columnsPdf = [];
        this.permisionsUsers = data.data;
        this.title = title_table ? title_table : this.t('tittle');
        this.labelsCell = labels[0];
        this.recordsPrint = data;
        this.recordsStatic = this.recordsPrint;
        this.keys = Object.keys(this.labelsCell);
        this.keys.forEach(element => {
          const label = labels[0][element];
          this.labels.push({
            value: label.value,
            type: label.type,
            label: element,
          });
          this.columnsPdf.push({
            title: label.value,
            dataKey: element,
          });
        });
        if (this.stylesExplorerService.validateBrowser()) {
          let dataEnterprise: Enterprise;
          document.getElementById(this.filter_active).classList.remove('filters-reports-active');
          dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
          ['with_permits', 'new_cont', 'see_organ', 'without_permits', 'see_rpgen', 'is_admin'].forEach(ele => {
            document.getElementById(ele).removeAttribute('style');
          });
          document.getElementById(parameter).style.backgroundColor = dataEnterprise.primary_color;
          document.getElementById(parameter).style.fontSize = '15px';
          document.getElementById(parameter).style.color = '#fff';
        } else {
          document.getElementById(this.filter_active).classList.remove('filters-reports-active');
          document.getElementById(this.filter_active).className = 'filters-reports cursor-general';
          document.getElementById(parameter).className = 'filters-reports-active';
        }

        this.filter_active = parameter;
      }
    });
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 100);
  }

  searcheByName() {
    const parameter = 'field_6';

    if (this.value_search !== '') {
      this.recordsPrint = this.recordsStatic.filter(
        (prod: any) =>
          prod[parameter]
            .toString()
            .toUpperCase()
            .indexOf(this.value_search.toUpperCase()) >= 0,
      );
    } else {
      this.recordsPrint = this.recordsStatic;
    }
  }

  pdfExport() {
    const title: string = this.title;
    console.log(title);
    const today = new Date();
    const dd: number = today.getDate();
    const mm: number = today.getMonth() + 1;
    const yyyy: number = today.getFullYear();
    let ddNew: string = dd.toString();
    let mmNew: string = mm.toString();

    if (dd.toString().length === 1) {
      ddNew = '0' + dd.toString();
    }
    if (mm.toString().length === 1) {
      mmNew = '0' + mm.toString();
    }

    const dateNow = ddNew + '/' + mmNew + '/' + yyyy;
    Promise.all([import('jspdf'), import('jspdf-autotable')]).then(([JsPDF]) => {
      const doc = new JsPDF('p', 'pt') as any;
      doc.page = 1;
      doc.autoTable(this.columnsPdf, this.recordsPrint, {
        theme: 'striped',
        styles: {
          cellPadding: 5,
          fontSize: 10,
          font: 'helvetica',
          fontStyle: 'normal',
          overflow: 'hidden',
          textColor: 20,
          halign: 'left',
          valign: 'middle',
          columnWidth: 'auto',
        },
        headerStyles: {
          fillColor: [91, 105, 110],
          fontStyle: 'bold',
          halign: 'center',
          textColor: 250,
        },
        margin: { top: 110 },
        addPageContent: function() {
          doc.setFontSize(16);
          doc.text(40, 60, title);
          // doc.setFontSize(12)
          // doc.text(40, 80, 'Empleado: Laura Andrea Beltran')
          doc.setFontSize(12);
          doc.text(40, 95, 'Generado el ' + dateNow);
          doc.setFontSize(10);
          doc.text(500, 60, 'pagina ' + doc.page);
          doc.page++;
        },
      });

      doc.save(title + '.pdf');
    });
  }

  excelExport() {
    this.excelService.exportAsExcelFile(this.recordsPrint, this.title, '.xlsx');
  }

  csvExport() {
    this.excelService.exportAsExcelFile(this.recordsPrint, this.title, '.csv');
  }

  printTable() {
    const objectTable: any[] = [];
    objectTable.push({
      title: this.title,
      labels: this.labelsCell,
      cells: this.recordsPrint,
    });
    this.printDataTableService.setObjectForPrint(objectTable);
  }
  returnBackPage() {
    this.router.navigate(['ihr/index']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
