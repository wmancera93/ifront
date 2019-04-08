import { Component, OnInit } from '@angular/core';
import { PrintDataTableService } from '../../../services/shared/common/print-data-table/print-data-table.service';

@Component({
  selector: 'app-print-data-table',
  templateUrl: './print-data-table.component.html',
  styleUrls: ['./print-data-table.component.css']
})
export class PrintDataTableComponent implements OnInit {
  public title = '';
  public keys: any[] = [];
  public labels: any[] = [];
  public recordsPrint: any[] = [];
  public labelsCell: any[] = [];

  count: number;

  constructor(public printDataTableService: PrintDataTableService) {
    this.printDataTableService.getObjectForPrint().subscribe(data => {
      if (this.count > 0) {
        return false;
      } else {
        this.title = data[0].title;
        this.labelsCell = data[0].labels;
        this.recordsPrint = data[0].cells;

        this.keys = Object.keys(this.labelsCell);
        this.keys.forEach((element) => {
          const label = data[0].labels[element];
          this.labels.push({ value: label.value, type: label.type, sort: label.sortable, label: element, id: 'sort_' + element });
        });

        document.getElementById('data_table').style.display = 'none';
        document.getElementById('printGeneral').removeAttribute('style');
        document.getElementById('printGeneral').style.display = 'block';
        setTimeout(() => {
          window.print();
          document.getElementById('data_table').removeAttribute('style');
          document.getElementById('data_table').style.display = 'block';
          document.getElementById('printGeneral').removeAttribute('style');
          document.getElementById('printGeneral').style.display = 'none';
        }, 500);
        setTimeout(() => {
          this.title = '';
          this.keys = [];
          this.labels = [];
          this.recordsPrint = [];
          this.labelsCell = [];
        }, 600);
      }
    });
  }

  ngOnInit() {

  }

}
