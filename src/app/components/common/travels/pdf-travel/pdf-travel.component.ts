import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../../../../models/general/enterprise';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';

declare var jsPDF: any;

@Component({
  selector: 'app-pdf-travel',
  templateUrl: './pdf-travel.component.html',
  styleUrls: ['./pdf-travel.component.css']
})
export class PdfTravelComponent implements OnInit {
  public dataEnterprise: Enterprise;

  constructor(public travelManagementService: TravelService) { }

  ngOnInit() {
  }

  printPDF() {
    let result: any = null;

    // this.travelManagementService.getTravelRequestsByid('434', false).subscribe((data) => {
    //   console.log(data);
    // });

    this.travelManagementService.getTravelsAllDetail('434').subscribe((data) => {
      result = data;
      this.dataEnterprise = JSON.parse(localStorage.getItem("enterprise"));

      var imgData = ''

      var lMargin = 15; //left margin in mm
      var rMargin = 15; //right margin in mm
      var pdfInMM = 210;  // width of A4 in mm
      var pageCenter = pdfInMM / 2;

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

      let doc = new jsPDF("p", "mm", "a4");

      doc.setFontSize(10);
      doc.text(this.dataEnterprise.name, pageCenter, 20, 'center');
      doc.text('FORMULARIO DE VIAJE', pageCenter, 25, 'center');
      doc.text('VIAJE NACIONAL / INTERNACIONAL', pageCenter, 30, 'center');
      doc.text('FECHA DE SOLICITUD: ' + dateNow, (pageCenter * 2) - rMargin, 20, 'right');
      doc.text('VIAJE NO: ' + result.data[0].travel_request.ticket.toString(), (pageCenter * 2) - rMargin, 25, 'right');

      let columnsMacro = ["DATOS DEL MARCO", ""];
      let dataMacro = [
        ["No. Empleado: " + result.data[0].travel_request.employee_applicant_to_json.personal_code.toString(), "Nombre Empleado: " + result.data[0].travel_request.employee_applicant_to_json.short_name.toString()],
        ["Unidad Organizativa: " + result.data[0].travel_request.employee_applicant_to_json.division_per.toString(), "Fecha: " + result.data[0].travel_request.date_begin_format.toString() + " hasta " + result.data[0].travel_request.date_end_format.toString()],
        ["Motivo: " + result.data[0].travel_request.observation.toString(), "Elemento de imputación: " + result.data[0].travel_request.observation.toString()],
        ["Actividad de viaje: Estación", "Centro de costo: Est.comp. izozog nr"],
        ["Estatus de Viaje: " + result.data[0].travel_request.status_request.toString(), "Clase de viaje legal: Negocios/comisión"],
        ["", "Clase de viaje especial: Estación"]
      ];

      doc.autoTable(columnsMacro, dataMacro, {
        theme: 'plain',
        styles: {
          cellPadding: 1,
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
          halign: 'left',
          textColor: 250,
        },
        margin: { top: 40 }
      }
      );

      let columnsHeaderJourneys = ["TRAYECTOS", ""];
      let dataHeaderJourneys: string[] = [];

      doc.autoTable(columnsHeaderJourneys, dataHeaderJourneys, {
        startY: doc.autoTable.previous.finalY + 10,
        pageBreak: 'avoid',
        theme: 'plain',
        styles: {
          cellPadding: 1,
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
          halign: 'left',
          textColor: 250,
        },
      }
      );

      let columnsBodyJourneys = ["Fecha", "HORA",];
      let dataBodyHeaderJourneys: string[] = [];

      doc.autoTable(columnsBodyJourneys, dataBodyHeaderJourneys, {
        startY: doc.autoTable.previous.finalY,
        pageBreak: 'avoid',
        theme: 'striped',
        styles: {
          cellPadding: 1,
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
          fillColor: [226, 226, 226],
          fontStyle: 'normal',
          halign: 'left',
          textColor: 20,
        },
      }
      );

      // doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
      doc.save('test' + '.pdf');
    });

  }
}
