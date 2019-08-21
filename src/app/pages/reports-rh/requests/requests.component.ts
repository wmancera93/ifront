import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Enterprise } from '../../../models/general/enterprise';
import { TablesPermisions } from '../../../models/common/tables/tables';
import { ReportsHrService } from '../../../services/reports-rh/reports-hr.service';
import { PrintDataTableService } from '../../../services/shared/common/print-data-table/print-data-table.service';
import { ExcelService } from '../../../services/common/excel/excel.service';
import { Angular2TokenService } from 'angular2-token';
import { Router, RoutesRecognized } from '@angular/router';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { ISubscription } from 'rxjs/Subscription';

declare var jsPDF: any;
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit, OnDestroy {
  @Output() objectToken: EventEmitter<any> = new EventEmitter();
  public requests: TablesPermisions[] = [];
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
  public placeholder_search: string;

  public filter_active = 'all';
  public value_search = '';

  public is_collapse = false;

  public token: boolean;
  public showButtonReturn: boolean;
  public pending: string;
  public approved: string;
  public inProcess: string;
  public cancelled: string;
  private subscriptions: ISubscription[];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.reports_rh.requests.${key}`;
  }

  constructor(
    public reportsHrService: ReportsHrService,
    public printDataTableService: PrintDataTableService,
    public excelService: ExcelService,
    private tokenService: Angular2TokenService,
    public router: Router,
    public aproversRequestsService: AproversRequestsService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
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
          document.body.setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        },
      ),
      this.router.events
        .pipe(filter(data => data instanceof RoutesRecognized))
        .pairwise()
        .subscribe((event: any[]) => {
          setTimeout(() => {
            if (event[0].urlAfterRedirects.toString() === '/ihr/index') {
              this.showButtonReturn = true;
            }
          }, 100);
        }),
      this.reportsHrService.getRequestsAll().subscribe((res: any) => {
        if (res.success) {
          const { title, labels, data } = res.data[0];
          this.requests = res.data;
          this.title = title ? title : this.t('tittle');
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
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth',
    });

    debugger;

    setTimeout(() => {
      if (this.stylesExplorerService.validateBrowser()) {
        let dataEnterprise: Enterprise;
        dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));
        document.getElementById('all').style.backgroundColor = dataEnterprise.primary_color;
      }
    }, 600);

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 300);
  }

  filter(parameter: string) {
    let param: string = parameter;
    if (parameter === 'all') {
      param = '';
    }
    this.reportsHrService.getRequestsByStatus(param).subscribe((res: any) => {
      if (res.success) {
        const { title_table, labels, data } = res.data[0];
        this.requests = [];
        this.title = '';
        this.labelsCell = [];
        this.recordsPrint = [];
        this.recordsStatic = [];
        this.labels = [];
        this.columnsPdf = [];
        this.requests = res.data;
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
          ['all', 'process', 'cancel', 'pending', 'aproved'].forEach(element => {
            document.getElementById(element).removeAttribute('style');
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

    this.stylesExplorerService.addStylesCommon();
  }

  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 100);
  }

  searcheByName() {
    const parameter = 'field_2';

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
    const title: string = this.title ? this.title : this.t('tittle_pdf_ts');
    const today = new Date();
    const dd: number = today.getDate();
    const mm: number = today.getMonth() + 1;
    const yyyy: number = today.getFullYear();
    let ddNew: string = dd.toString();
    let mmNew: string = mm.toString();

    let alineation = '';
    let positionPage = 0;

    if (dd.toString().length === 1) {
      ddNew = '0' + dd.toString();
    }
    if (mm.toString().length === 1) {
      mmNew = '0' + mm.toString();
    }

    const dateNow = ddNew + '/' + mmNew + '/' + yyyy;
    if (this.columnsPdf.length > 5) {
      alineation = 'l';
      positionPage = 740;
    } else {
      alineation = 'p';
      positionPage = 500;
    }

    const doc = new jsPDF(alineation, 'pt');
    doc.page = 1;

    const column = [];

    this.columnsPdf.forEach((data: any) => {
      if (data.title !== 'Acción') {
        column.push(data);
      }
    });

    const self = this;

    doc.autoTable(column, this.recordsPrint, {
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
        doc.text(40, 95, self.t('generate_ts') + dateNow);
        doc.setFontSize(10);
        doc.text(positionPage, 60, self.t('page') + doc.page);
        doc.page++;
      },
    });
    doc.save(title + '.pdf');
  }

  excelExport() {
    const object: any[] = [];
    this.reportsHrService.getRequestsExcelByStatus(this.filter_active).subscribe((data: any) => {
      if (data.data.length > 0) {
        data.data.forEach(element => {
          object.push({
            Ticket: element.id,
            TipoSolicitud: element.type_requests_name,
            NombreSolicitante: '#' + element.pernr + ' - ' + element.name_applicant,
            Estado: element.status,
            Plataforma: element.next_platform + ' - #Nivel:' + element.next_level,
            FechaSolicitud: element.created,
            FechaInicial: element.date_begin_format,
            FechaFinal: element.date_end_format,
          });
        });
      }

      this.excelService.exportAsExcelFile(object, this.title, '.xlsx');
    });
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

  viewDetail(id: any) {
    const objectSend = { ticket: id };
    this.aproversRequestsService.setRequests({
      request: objectSend,
      type_request: 'requestsOnly',
    });
    // this.aproversRequestsService.setRequests({ ticket: id , type_requests_name:'requestsOnly'})
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
