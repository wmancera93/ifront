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

    this.travelManagementService.getTravelsAllDetail('456').subscribe((data) => {
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
      let dataMacro
      if (result.data[0].travel_request.travel_costs_type_code === "KOSTL") {
        dataMacro = [
          ["No. Empleado: " + result.data[0].travel_request.employee_applicant_to_json.personal_code.toString(), "Nombre Empleado: " + result.data[0].travel_request.employee_applicant_to_json.short_name.toString()],
          ["Unidad Organizativa: " + result.data[0].travel_request.employee_applicant_to_json.division_per.toString(), "Fecha: " + result.data[0].travel_request.date_begin_format.toString() + " hasta " + result.data[0].travel_request.date_end_format.toString()],
          ["Motivo: " + result.data[0].travel_request.observation.toString(), "Elemento de imputación: " + result.data[0].travel_request.travel_costs_type_name.toString()],
          ["Actividad de viaje: " + result.data[0].travel_request.travel_activity_name.toString(), "Centro de costo: " + result.data[0].travel_request.travel_cost_name.toString()],
          ["Estatus de Viaje: " + result.data[0].travel_request.status_request.toString(), "Clase de viaje legal: " + result.data[0].travel_request.legal_travels_type_name.toString()],
          ["", "Clase de viaje especial: " + result.data[0].travel_request.specific_types_trip_name.toString()]
        ];
      }

      if (result.data[0].travel_request.travel_costs_type_code === "NPLNR") {
        dataMacro = [
          ["No. Empleado: " + result.data[0].travel_request.employee_applicant_to_json.personal_code.toString(), "Nombre Empleado: " + result.data[0].travel_request.employee_applicant_to_json.short_name.toString()],
          ["Unidad Organizativa: " + result.data[0].travel_request.employee_applicant_to_json.division_per.toString(), "Fecha: " + result.data[0].travel_request.date_begin_format.toString() + " hasta " + result.data[0].travel_request.date_end_format.toString()],
          ["Motivo: " + result.data[0].travel_request.observation.toString(), "Elemento de imputación: " + result.data[0].travel_request.travel_costs_type_name.toString()],
          ["Actividad de viaje: " + result.data[0].travel_request.travel_activity_name.toString(), "Grafo: " + result.data[0].travel_request.travel_graph_name.toString()],
          ["", "Operación: " + result.data[0].travel_request.travel_operation_name.toString()],
          ["Estatus de Viaje: " + result.data[0].travel_request.status_request.toString(), "Clase de viaje legal: " + result.data[0].travel_request.legal_travels_type_name.toString()],
          ["", "Clase de viaje especial: " + result.data[0].travel_request.specific_types_trip_name.toString()]
        ];
      }


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

      if (this.journeys(result, doc)) {
        if (this.advances(result, doc)) {
          doc.save('test' + '.pdf');
        }
      }

    });

  }

  journeys(result, doc) {
    if (result.data[0].travel_managements.data.length > 0) {
      let labels = [];
      let columnsPdf = [];
      let labelsCell;

      labelsCell = result.data[0].travel_managements.labels;

      let keys = Object.keys(labelsCell);
      let recordsPrint = result.data[0].travel_managements.data;

      keys.forEach((element) => {
        if (element !== 'field_3' && element !== 'field_6' && element !== 'field_9') {
          let label: any;
          label = result.data[0].travel_managements.labels[element];

          labels.push({ value: label.value, type: label.type, sort: label.sortable, label: element, id: 'sort_' + element });
          columnsPdf.push({ title: label.value == 'Tipo de Transporte ' ? 'Transporte' : label.value == 'Fecha y Hora Origen' ? 'F/H Origen' : label.value == 'Fecha y Hora Destino' ? 'F/H Destino' : label.value, dataKey: element });
        }
      })



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

      let columnsBodyJourneys = columnsPdf;
      let dataBodyHeaderJourneys = recordsPrint;

      doc.autoTable(columnsBodyJourneys, dataBodyHeaderJourneys, {
        startY: doc.autoTable.previous.finalY,
        pageBreak: 'avoid',
        theme: 'grid',
        styles: {
          cellPadding: 1,
          fontSize: 8,
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

    }

    return true;

  }

  advances(result, doc) {
    debugger
    if (result.data[0].travel_advance_requests.travel_advance_payments.length > 0) {
      let labels = [];
      let columnsPdf = [];
      let labelsCell;

      labelsCell = result.data[0].travel_advance_requests.labels;

      let keys = Object.keys(labelsCell);
      let recordsPrint = result.data[0].travel_advance_requests.data;

      keys.forEach((element) => {
        // if (element !== 'field_3' && element !== 'field_6' && element !== 'field_9') {
          let label: any;
          label = result.data[0].travel_advance_requests.labels[element];

          labels.push({ value: label.value, type: label.type, sort: label.sortable, label: element, id: 'sort_' + element });
          columnsPdf.push({ title: label.value, dataKey: element });
        // }
      })



      let columnsHeaderJourneys = ["ANTICIPOS", ""];
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

      let columnsBodyJourneys = columnsPdf;
      let dataBodyHeaderJourneys = recordsPrint;

      doc.autoTable(columnsBodyJourneys, dataBodyHeaderJourneys, {
        startY: doc.autoTable.previous.finalY,
        pageBreak: 'avoid',
        theme: 'grid',
        styles: {
          cellPadding: 1,
          fontSize: 8,
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

    }

    return true;
  }
}
