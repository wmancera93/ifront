import { Component, OnInit, Input } from '@angular/core';

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
  public p: number = 1;
  public size_table: number = 10;

  constructor() { }

  ngOnInit() {
    this.records.subscribe((data) => {
      if (data.data[0].data.length > 0) {
        this.show = true;
        this.keys = Object.keys(data.data[0].data[0]);
        this.recordsPrint = data.data[0].data;
      } else {
        this.show = false;
      }
    });
  }
}
