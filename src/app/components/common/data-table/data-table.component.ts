import { Component, OnInit, Input } from '@angular/core';
import { element } from 'protractor';

export interface ColumnSetting {
  primaryKey: string;
  header?: string;
  format?: string;
  alternativeKeys?: string[];
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  public show: boolean = true;
  @Input() records: any;
  @Input() recordsPrint: any[] = [];
  @Input() title: any;
  public keys: any[] = [];
  public labels: any[] = [];
  public p: number = 1;
  public size_table: number = 10;

  constructor() { }

  ngOnInit() {
    this.records.subscribe((data) => {
      if (data.data[0].data.length > 0) {
        this.show = true;
        this.keys = Object.keys(data.data[0].labels);
        this.recordsPrint = data.data[0].data;

        this.keys.forEach((element) => {
          let label = data.data[0].labels[element]
          this.labels.push({ value: label.value, type: label.type, sort: label.sortable, label: element, id: 'sort_' + element });           
        })
        
      } else {
        this.show = false;
      }
    });
  }

  sortable(label) {
    let descending: boolean = true;

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
}
