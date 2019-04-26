import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
/* import * as XLSX from 'xlsx'; */

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';


@Injectable()
export class ExcelService {
  public EXCEL_EXTENSION = '';
  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string, extension: string): void {
    import('xlsx').then(XLSX => {
      const worksheet = XLSX.utils.json_to_sheet(json);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName, extension);
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string, extension: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    this.EXCEL_EXTENSION = extension;
    FileSaver.saveAs(data, fileName + this.EXCEL_EXTENSION);
  }

}
