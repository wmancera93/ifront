import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { element } from 'protractor';
import { Enterprise } from '../../../models/general/enterprise';
import { PrintDataTableService } from '../../../services/shared/common/print-data-table/print-data-table.service';
import { ExcelService } from '../../../services/common/excel/excel.service';
import { Router, NavigationEnd } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';

declare var jsPDF: any;

export interface ColumnSetting {
  primaryKey: string;
  header?: string;
  format?: string;
  alternativeKeys?: string[];
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],

})
export class DataTableComponent implements OnInit {
  public show = true;
  @Input() records: any;
  @Input() recordsPrint: any[] = [];
  @Input() title: any;
  @Input() excel?: any = false;
  @Input() pdf?: any = true;
  @Input() sizeTable?: any = true;
  @Input() minHeight?: any = true;

  public height = "min-height: 370px;";

  public keys: any[] = [];
  public labels: any[] = [];
  public p = 1;
  public size_table: number = 10;

  public labelsCell: any[] = [];

  public columnsPdf: any[] = [];
  public rowsColsPdf: any[] = [];

  public recordsStatic: any[] = [];

  public objectTable: any[] = [];


  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public printDataTableService: PrintDataTableService,
    public excelService: ExcelService,
    public router: Router,
    private tokenService: Angular2TokenService,
    private accionDataTableService: DataDableSharedService,
    public stylesExplorerService: StylesExplorerService) {

    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        });


    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    this.records.subscribe((data) => {
      if (data.data.length > 0) {
        if (data.data[0].data.length > 0) {
          this.labels = [];
          this.columnsPdf = [];
          this.show = true;

          if (data.data[0].labels[0] === undefined) {
            this.labelsCell = data.data[0].labels;
          } else {
            this.labelsCell = data.data[0].labels[0];
          }

          this.keys = Object.keys(this.labelsCell);
          this.recordsPrint = data.data[0].data;
          this.recordsStatic = this.recordsPrint;
          this.keys.forEach((element) => {
            let label: any;
            if (data.data[0].labels[0] === undefined) {
              label = data.data[0].labels[element];
            } else {
              label = data.data[0].labels[0][element];
            }

            this.labels.push({ value: label.value, type: label.type, sort: label.sortable, label: element, id: 'sort_' + element });
            this.columnsPdf.push({ title: label.value, dataKey: element });
          })
        } else {
          this.show = false;
        }
      } else {
        this.show = false;
      }
      if (data.success) {
        // setTimeout(() => {
        //   document.getElementById("loginId").style.display = 'none';
        //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        // }, 1500)
      }
    });


    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 4000);
  }

  pdfExport() {
    let title: string = this.title;
    var today = new Date();
    let dd: number = today.getDate();
    let mm: number = today.getMonth() + 1;
    let yyyy: number = today.getFullYear();
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

    let dateNow = ddNew + '/' + mmNew + '/' + yyyy;
    let dataEnterprise: Enterprise = JSON.parse(localStorage.getItem("enterprise"))
    if (this.columnsPdf.length > 5) {
      alineation = 'l';
      positionPage = 740;
    } else {
      alineation = 'p';
      positionPage = 500;
    }

    var doc = new jsPDF(alineation, 'pt');
    doc.page = 1;

    doc.autoTable(this.columnsPdf, this.recordsPrint, {
      theme: 'striped',
      styles: {
        cellPadding: 5,
        fontSize: 10,
        font: "helvetica",
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
      addPageContent: function (data) {
        doc.setFontSize(16)
        doc.text(40, 60, title)
        doc.setFontSize(12)
        doc.text(40, 95, 'Generado el ' + dateNow)
        doc.setFontSize(10)
        doc.text(positionPage, 60, 'pagina ' + doc.page);
        doc.page++;
      }
    });
    doc.save(title + '.pdf')
  }

  excelExport() {
    this.excelService.exportAsExcelFile(this.recordsPrint, this.title, '.xlsx');
  }

  csvExport() {
    this.excelService.exportAsExcelFile(this.recordsPrint, this.title, '.csv');
  }

  printTable() {
    this.objectTable.push({ title: this.title, labels: this.labelsCell, cells: this.recordsPrint })
    this.printDataTableService.setObjectForPrint(this.objectTable);
    this.objectTable = [];
  }

  sortable(label: any) {
    let descending: boolean = true;
    let idPrevius: string = '';
    if (document.getElementsByClassName('fa-chevron-up').length > 0) {
      idPrevius = (<HTMLInputElement>document.getElementsByClassName('fa-chevron-up')[0]).id
      if (idPrevius !== label.id) {
        document.getElementById(idPrevius).classList.remove('fa');
        document.getElementById(idPrevius).classList.remove('fa-chevron-up');
        document.getElementById(idPrevius).classList.remove('cursor-general');
        document.getElementById(idPrevius).className = 'fa fa-chevron-down cursor-general';
      }
    }

    if (document.getElementById(label.id).classList[1] === 'fa-chevron-down') {
      document.getElementById(label.id).classList.remove('fa');
      document.getElementById(label.id).classList.remove('fa-chevron-down');
      document.getElementById(label.id).classList.remove('cursor-general');
      document.getElementById(label.id).className = 'fa fa-chevron-up cursor-general';

      descending = false;
    } else {
      document.getElementById(label.id).classList.remove('fa');
      document.getElementById(label.id).classList.remove('fa-chevron-up');
      document.getElementById(label.id).classList.remove('cursor-general');
      document.getElementById(label.id).className = 'fa fa-chevron-down cursor-general';
      descending = true;
    }

    switch (label.type) {
      case 'string': {
        this.recordsPrint = this.recordsPrint.sort(function (a, b) {
          const nameA: String = a[label.label];
          const nameB: String = b[label.label];

          if (!descending) {
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          } else {
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
          }
        });

        break;
      }
      case 'int': {
        this.recordsPrint = this.recordsPrint.sort(function (a, b) {
          if (!descending) {
            return parseFloat(a[label.label]) - parseFloat(b[label.label]);
          } else {
            return parseFloat(b[label.label]) - parseFloat(a[label.label]);
          }
        });
        break;
      }
      case 'date': {
        this.recordsPrint = this.recordsPrint.sort(function (a, b) {
          let dateA: any = new Date(a[label.label]);
          let dateB: any = new Date(b[label.label]);
          if (!descending) {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  filterByCell(value: any, label: any) {
    for (let i = 0; i < document.getElementsByClassName('input-filter').length; i++) {
      if (i != value) {
        (<HTMLInputElement>document.getElementsByClassName('input-filter')[i]).value = '';
      }
    }

    let input = (<HTMLInputElement>document.getElementById(value + label.label)).value;
    let parameter = label.label;
    this.recordsPrint = this.recordsStatic.filter((prod: any) => prod[parameter].toString().toUpperCase().indexOf(input.toUpperCase()) >= 0);

  }

  excelDownload(type) {
    this.accionDataTableService.setActionDataTable(type);
  }
  accionTable(fieldSelected: any) {
    this.accionDataTableService.setActionDataTable(fieldSelected);
  }

}