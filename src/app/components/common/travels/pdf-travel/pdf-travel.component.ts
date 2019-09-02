import { Component, OnInit, Input } from '@angular/core';
import { Enterprise } from '../../../../models/general/enterprise';
import { TravelService } from '../../../../services/travel-management/travels/travel.service';

@Component({
  selector: 'app-pdf-travel',
  templateUrl: './pdf-travel.component.html',
  styleUrls: ['./pdf-travel.component.css'],
})
export class PdfTravelComponent implements OnInit {
  public dataEnterprise: Enterprise;
  public result: any = null;

  @Input('ticketTravel') ticketTravel: any;

  constructor(public travelManagementService: TravelService) {}

  ngOnInit() {}

  printPDF() {
    this.result = null;

    this.travelManagementService.getTravelsAllDetail(this.ticketTravel).subscribe(data => {
      Promise.all([import('jspdf'), import('jspdf-autotable')]).then(async ([JsPDF]) => {
        this.result = data;
        this.dataEnterprise = JSON.parse(localStorage.getItem('enterprise'));

        const rMargin = 15; //right margin in mm
        const pdfInMM = 210; // width of A4 in mm
        const pageCenter = pdfInMM / 2;

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
        const doc = new JsPDF('p', 'mm', 'a4') as any;

        let imgData = 'S300';
        const {
          society_code,
          short_name,
          personal_code,
          div_person_code,
          division_per,
          number_document,
        } = this.result.data[0].travel_request.employee_applicant_to_json;
        const images = await import('./images');
        switch (society_code) {
          case 'T300':
            imgData = images.T300;
            doc.addImage(imgData, 'JPEG', 15, 15, 40, 20);
            break;
          case 'S300':
            imgData = images.S300;
            doc.addImage(imgData, 'JPEG', 15, 15, 30, 20);
            break;

          default:
            imgData = images.imageDefault;

            doc.addImage(imgData, 'JPEG', 15, 15, 40, 20);
            break;
        }

        const {
          travel_requests_type_name,
          ticket_cli,
          managing_employee_to_json,
          abrev_text_issue_doc,
          date_begin_format,
          date_end_format,
          travel_activity_name,
          travel_costs_type_code,
          travel_costs_type_name,
          travel_cost_code,
          travel_cost_name,
          travel_graph_code,
          travel_graph_name,
          travel_operation_code,
          travel_operation_name,
          travel_order_code,
          travel_order_name,
          status_request,
          legal_travels_type_name,
          specific_types_trip_name,
          observation,
        } = this.result.data[0].travel_request;

        doc.setFontSize(10);
        doc.text(this.dataEnterprise.name, pageCenter, 20, 'center');
        doc.text('FORMULARIO DE VIAJE', pageCenter, 25, 'center');
        doc.text(travel_requests_type_name.toUpperCase(), pageCenter, 30, 'center');
        doc.text('FECHA DE SOLICITUD: ' + dateNow, pageCenter * 2 - rMargin, 20, 'right');
        if (ticket_cli !== null) {
          doc.text('VIAJE NO: ' + ticket_cli.toString(), pageCenter * 2 - rMargin, 25, 'right');
        }

        const columnsMacro = ['DATOS MARCO', ''];
        let dataMacro;
        const third = managing_employee_to_json === null ? short_name : managing_employee_to_json.short_name.toString();

        const objectPDF = {
          third: third,
          text_issue: abrev_text_issue_doc || '',
          personal_code: personal_code || '',
          code_unit_organizative: div_person_code || '',
          text_unit_organizative: division_per || '',
          name_traveler: short_name || '',
          identification_traveler: number_document || '',
          date_begin_travel: date_begin_format || '',
          date_end_travel: date_end_format || '',
          activity_travel: travel_activity_name || '',
          code_element_imputation: travel_costs_type_code || '',
          text_element_imputation: travel_costs_type_name || '',
          code_center_coast: travel_cost_code || '',
          text_center_coast: travel_cost_name || '',
          code_graph: travel_graph_code || '',
          text_graph: travel_graph_name || '',
          code_operation: travel_operation_code || '',
          text_operation: travel_operation_name || '',
          code_orders: travel_order_code || '',
          text_orders: travel_order_name || '',
          status_travel: status_request || '',
          class_travel_legal: legal_travels_type_name || '',
          class_travel_especial: specific_types_trip_name || '',
          reason: observation || '',
        };

        if (travel_costs_type_code === 'KOSTL') {
          dataMacro = [
            ['Viaje registrado por: ' + objectPDF.third, ''],
            [
              'No. Empleado: ' + objectPDF.personal_code,
              'Unidad Organizativa:\n' + objectPDF.code_unit_organizative + ' - ' + objectPDF.text_unit_organizative,
            ],
            ['Nombre Viajero: ' + objectPDF.name_traveler, 'Carné de Identidad: ' + objectPDF.identification_traveler],
            ['', 'Lugar de expedición: ' + objectPDF.text_issue],
            ['', 'Fecha: ' + objectPDF.date_begin_travel + ' hasta ' + objectPDF.date_end_travel],
            ['', 'Elemento de imputación:\n' + objectPDF.code_element_imputation + ' - ' + objectPDF.text_element_imputation],
            [
              'Actividad de viaje: ' + objectPDF.activity_travel,
              'Centro de costo:\n' + objectPDF.code_center_coast + ' - ' + objectPDF.text_center_coast,
            ],
            ['Estatus de Viaje: ' + objectPDF.status_travel, 'Clase de viaje legal: ' + objectPDF.class_travel_legal],
            ['', 'Clase de viaje especial: ' + objectPDF.class_travel_especial],
          ];
        }

        if (travel_costs_type_code === 'NPLNR') {
          dataMacro = [
            ['Viaje registrado por: ' + objectPDF.third, ''],
            [
              'No. Empleado: ' + objectPDF.personal_code,
              'Unidad Organizativa:\n' + objectPDF.code_unit_organizative + ' - ' + objectPDF.text_unit_organizative,
            ],
            ['Nombre Viajero: ' + objectPDF.name_traveler, 'Carné de Identidad: ' + objectPDF.identification_traveler],
            ['', 'Lugar de expedición: ' + objectPDF.text_issue],
            ['', 'Fecha: ' + objectPDF.date_begin_travel + ' hasta ' + objectPDF.date_end_travel],
            ['', 'Elemento de imputación:\n' + objectPDF.code_element_imputation + ' - ' + objectPDF.text_element_imputation],
            ['Actividad de viaje: ' + objectPDF.activity_travel, 'Grafo: ' + objectPDF.code_graph + ' - ' + objectPDF.text_graph],
            ['', 'Operación:\n' + objectPDF.code_operation + ' - ' + objectPDF.text_operation],
            ['Estatus de Viaje: ' + objectPDF.status_travel, 'Clase de viaje legal: ' + objectPDF.class_travel_legal],
            ['', 'Clase de viaje especial: ' + objectPDF.class_travel_especial],
          ];
        }

        if (travel_costs_type_code === 'AUFNR') {
          dataMacro = [
            ['Viaje registrado por: ' + objectPDF.third, ''],
            [
              'No. Empleado: ' + objectPDF.personal_code,
              'Unidad Organizativa:\n' + objectPDF.code_unit_organizative + ' - ' + objectPDF.text_unit_organizative,
            ],
            ['Nombre Viajero: ' + objectPDF.name_traveler, 'Carné de Identidad: ' + objectPDF.identification_traveler],
            ['', 'Lugar de expedición: ' + objectPDF.text_issue],
            ['', 'Fecha: ' + objectPDF.date_begin_travel + ' hasta ' + objectPDF.date_end_travel],
            ['', 'Elemento de imputación:\n' + objectPDF.code_element_imputation + ' - ' + objectPDF.text_element_imputation],
            [
              'Actividad de viaje: ' + objectPDF.activity_travel,
              'Orden Mantenimiento:\n' + objectPDF.code_orders + ' - ' + objectPDF.text_orders,
            ],
            ['Estatus de Viaje: ' + objectPDF.status_travel, 'Clase de viaje legal: ' + objectPDF.class_travel_legal],
            ['', 'Clase de viaje especial: ' + objectPDF.class_travel_especial],
          ];
        }

        doc.autoTable(columnsMacro, dataMacro, {
          theme: 'plain',
          styles: {
            cellPadding: 1,
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
            halign: 'left',
            textColor: 250,
          },
          margin: { top: 40 },
        });

        const columnsReasonJourneys = ['MOTIVO VIAJE'];
        const dataReasonHeaderJourneys = [[objectPDF.reason]];

        doc.autoTable(columnsReasonJourneys, dataReasonHeaderJourneys, {
          startY: doc.autoTable.previous.finalY,
          pageBreak: 'avoid',
          theme: 'plain',
          styles: {
            cellPadding: 1,
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
            fillColor: [226, 226, 226],
            fontStyle: 'normal',
            halign: 'left',
            textColor: 20,
          },
        });

        if (this.journeys(this.result, doc)) {
          if (this.hotels(this.result, doc)) {
            if (this.advances(this.result, doc)) {
              if (this.allowance(this.result, doc)) {
                if (this.distribution(this.result, doc)) {
                  if (this.comentaries(this.result, doc)) {
                    if (this.approvals(this.result, doc)) {
                      const columnsSign = [''];
                      const dataSign = [
                        ['______________________________________________'],
                        [short_name.toString().toUpperCase()],
                      ];

                      doc.autoTable(columnsSign, dataSign, {
                        startY: doc.autoTable.previous.finalY + 25,
                        pageBreak: 'avoid',
                        theme: 'plain',
                        styles: {
                          cellPadding: 1,
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
                          fillColor: [255, 255, 255],
                          fontStyle: 'normal',
                          halign: 'left',
                          textColor: 20,
                        },
                      });

                      doc.save('Solicitud de viaje No ' + this.result.data[0].travel_request.ticket.toString() + '.pdf');
                    }
                  }
                }
              }
            }
          }
        }
      });
    });
  }

  journeys(result, doc) {
    if (result.data[0].travel_managements.data.length > 0) {
      const labels = [];
      const columnsPdf = [];
      let labelsCell;

      labelsCell = result.data[0].travel_managements.labels;

      const keys = Object.keys(labelsCell);
      const recordsPrint = result.data[0].travel_managements.data;

      keys.forEach(element => {
        if (
          element !== 'field_0' &&
          element !== 'field_3' &&
          element !== 'field_6' &&
          element !== 'field_8' &&
          element !== 'field_9' &&
          element !== 'field_10' &&
          element !== 'field_11'
        ) {
          let label: any;
          label = result.data[0].travel_managements.labels[element];

          labels.push({
            value: label.value,
            type: label.type,
            sort: label.sortable,
            label: element,
            id: 'sort_' + element,
          });
          columnsPdf.push({
            title:
              label.value == 'Tipo de Transporte '
                ? 'Transporte'
                : label.value == 'Fecha y Hora Origen'
                ? 'F/H Origen'
                : label.value == 'Fecha y Hora Destino'
                ? 'F/H Destino'
                : label.value,
            dataKey: element,
          });
        }
      });

      const columnsHeaderJourneys = ['TRAYECTOS', ''];
      const dataHeaderJourneys: string[] = [];

      doc.autoTable(columnsHeaderJourneys, dataHeaderJourneys, {
        startY: doc.autoTable.previous.finalY + 10,
        pageBreak: 'avoid',
        theme: 'plain',
        styles: {
          cellPadding: 1,
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
          halign: 'left',
          textColor: 250,
        },
      });

      const columnsBodyJourneys = columnsPdf;
      const dataBodyHeaderJourneys = recordsPrint;

      doc.autoTable(columnsBodyJourneys, dataBodyHeaderJourneys, {
        startY: doc.autoTable.previous.finalY,
        pageBreak: 'avoid',
        theme: 'grid',
        styles: {
          cellPadding: 1,
          fontSize: 8,
          font: 'helvetica',
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
          halign: 'center',
          textColor: 20,
        },
      });
    }

    return true;
  }

  advances(result, doc) {
    if (result.data[0].travel_advance_requests.data.length > 0) {
      const labels = [];
      const columnsPdf = [];
      let labelsCell;

      const table_advances_view = [];

      result.data[0].travel_advance_requests.data.forEach(element => {
        element.travel_advance_payments.forEach(dataObject => {
          table_advances_view.push(dataObject);
        });
      });

      const object = {
        labels: result.data[0].travel_advance_requests.labels,
        data: table_advances_view,
      };

      labelsCell = object.labels;

      const keys = Object.keys(labelsCell);
      const recordsPrint = object.data;

      keys.forEach(element => {
        if (element !== 'field_7') {
          let label: any;
          label = result.data[0].travel_advance_requests.labels[element];

          labels.push({
            value: label.value,
            type: label.type,
            sort: label.sortable,
            label: element,
            id: 'sort_' + element,
          });
          columnsPdf.push({ title: label.value, dataKey: element });
        }
      });

      const columnsHeaderJourneys = ['ANTICIPOS', ''];
      const dataHeaderJourneys: string[] = [];

      doc.autoTable(columnsHeaderJourneys, dataHeaderJourneys, {
        startY: doc.autoTable.previous.finalY + 10,
        pageBreak: 'avoid',
        theme: 'plain',
        styles: {
          cellPadding: 1,
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
          halign: 'left',
          textColor: 250,
        },
      });

      const columnsBodyJourneys = columnsPdf;
      const dataBodyHeaderJourneys: any[] = [];

      recordsPrint.forEach(element => {
        element.field_1 = parseFloat(element.field_1).toLocaleString('es', { minimumFractionDigits: 2 });
        dataBodyHeaderJourneys.push(element);
      });

      doc.autoTable(columnsBodyJourneys, dataBodyHeaderJourneys, {
        startY: doc.autoTable.previous.finalY,
        pageBreak: 'avoid',
        theme: 'grid',
        styles: {
          cellPadding: 1,
          fontSize: 8,
          font: 'helvetica',
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
          halign: 'center',
          textColor: 20,
        },
        createdCell: function(cell, data) {
          align(cell, data);
        },
      });
    }

    function align(cell, data) {
      if (data.column.dataKey === 'field_1') {
        cell.styles.halign = 'right';
      }
    }

    return true;
  }

  hotels(result, doc) {
    if (result.data[0].travel_managements.hotels.length > 0) {
      const recordsPrint = [];

      result.data[0].travel_managements.hotels.forEach(element => {
        element.hotels.forEach(hotel => {
          recordsPrint.push({
            hotel: hotel.hotel_name,
            date_begin:
              hotel.date_begin.split('-')[2] + '/' + hotel.date_begin.split('-')[1] + '/' + hotel.date_begin.split('-')[0],
            date_end: hotel.date_end.split('-')[2] + '/' + hotel.date_end.split('-')[1] + '/' + hotel.date_end.split('-')[0],
          });
        });
      });

      if (recordsPrint.length > 0) {
        const columnsHeaderJourneys = ['HOTELES', ''];
        const dataHeaderJourneys: string[] = [];

        doc.autoTable(columnsHeaderJourneys, dataHeaderJourneys, {
          startY: doc.autoTable.previous.finalY + 10,
          pageBreak: 'avoid',
          theme: 'plain',
          styles: {
            cellPadding: 1,
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
            halign: 'left',
            textColor: 250,
          },
        });

        const columnsPdf = [
          { title: 'Hotel', dataKey: 'hotel' },
          { title: 'Fecha Inicio', dataKey: 'date_begin' },
          { title: 'Fecha Fin', dataKey: 'date_end' },
        ];

        doc.autoTable(columnsPdf, recordsPrint, {
          startY: doc.autoTable.previous.finalY,
          pageBreak: 'avoid',
          theme: 'grid',
          styles: {
            cellPadding: 1,
            fontSize: 8,
            font: 'helvetica',
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
            halign: 'center',
            textColor: 20,
          },
        });
      }
    }

    return true;
  }

  allowance(result, doc) {
    if (
      result.data[0].travel_allowance_request.data !== null &&
      result.data[0].travel_allowance_request.data.length === undefined
    ) {
      const labels = [];
      const columnsPdf = [];
      let labelsCell;

      labelsCell = result.data[0].travel_allowance_request.labels;

      const keys = Object.keys(labelsCell);
      const recordsPrint = result.data[0].travel_allowance_request.data.travel_allowances;

      keys.forEach(element => {
        if (
          element !== 'field_7' &&
          element !== 'field_8' &&
          element !== 'field_9' &&
          element !== 'field_13' &&
          element !== 'field_11' &&
          element !== 'field_12' &&
          element !== 'field_14' &&
          element !== 'field_15' &&
          element !== 'field_20'
        ) {
          let label: any;
          label = result.data[0].travel_allowance_request.labels[element];

          const labelPrint =
            label.value === 'Tipo de gasto '
              ? 'Gasto'
              : label.value === 'tipo de moneda'
              ? 'Moneda'
              : label.value === 'valor'
              ? 'Valor'
              : label.value === 'Nit'
              ? 'Documento'
              : label.value === 'razón social'
              ? 'Razón social'
              : label.value === 'Cód. de gasto '
              ? 'Código'
              : label.value;

          labels.push({
            value: label.value,
            type: label.type,
            sort: label.sortable,
            label: element,
            id: 'sort_' + element,
          });
          columnsPdf.push({ title: labelPrint, dataKey: element });
        }
      });

      const columnsHeaderJourneys = ['GASTOS', ''];
      const dataHeaderJourneys: string[] = [];

      doc.autoTable(columnsHeaderJourneys, dataHeaderJourneys, {
        startY: doc.autoTable.previous.finalY + 10,
        pageBreak: 'avoid',
        theme: 'plain',
        styles: {
          cellPadding: 1,
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
          halign: 'left',
          textColor: 250,
        },
      });

      const dataBodyHeaderJourneys: any[] = [];

      recordsPrint.forEach(element => {
        element.field_3 = parseFloat(element.field_3).toLocaleString('es', { minimumFractionDigits: 2 });
        dataBodyHeaderJourneys.push(element);
      });

      const columnsBodyJourneys = columnsPdf;

      doc.autoTable(columnsBodyJourneys, dataBodyHeaderJourneys, {
        startY: doc.autoTable.previous.finalY,
        pageBreak: 'avoid',
        theme: 'grid',
        styles: {
          cellPadding: 1,
          fontSize: 8,
          font: 'helvetica',
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
          halign: 'center',
          textColor: 20,
        },
        createdCell: function(cell, data) {
          align(cell, data);
        },
      });

      let bob = '0';
      let usd = '0';

      result.data[0].travel_allowance_request.total_importe.forEach(element => {
        if (element[1] === 'BOB') {
          bob = element[2].toString();
        }
        if (element[1] === 'USD') {
          usd = element[2].toString();
        }
      });

      const columnsReasonJourneys = [
        { title: 'Total gastos BOB', dataKey: 'bob' },
        { title: 'Total gastos USD', dataKey: 'usd' },
      ];
      const dataReasonHeaderJourneys = [
        {
          bob: parseFloat(bob).toLocaleString('es', {
            minimumFractionDigits: 2,
          }),
          usd: parseFloat(usd).toLocaleString('es', {
            minimumFractionDigits: 2,
          }),
        },
      ];

      doc.autoTable(columnsReasonJourneys, dataReasonHeaderJourneys, {
        startY: doc.autoTable.previous.finalY,
        pageBreak: 'avoid',
        theme: 'grid',
        styles: {
          cellPadding: 1,
          fontSize: 8,
          font: 'helvetica',
          fontStyle: 'normal',
          overflow: 'hidden',
          textColor: 20,
          halign: 'right',
          valign: 'middle',
          columnWidth: 'auto',
        },
        headerStyles: {
          fillColor: [226, 226, 226],
          fontStyle: 'normal',
          halign: 'left',
          textColor: 20,
        },
      });
    }
    function align(cell, data) {
      if (data.column.dataKey === 'field_3') {
        cell.styles.halign = 'right';
      }
    }
    return true;
  }

  distribution(result, doc) {
    if (
      result.data[0].travel_allowance_request.data !== null &&
      result.data[0].travel_allowance_request.data.length === undefined
    ) {
      const recordsPrint = [];

      result.data[0].travel_allowance_request.cost_distribution.travel_allowances.forEach(element => {
        const code_allowance = element.type_allowance_code;
        element.cost_distribution_allowances.forEach(distribution => {
          const coast =
            distribution.travel_cost_code.toString() === ''
              ? ''
              : distribution.travel_cost_code.toString() + '-' + distribution.travel_cost_name;
          const graph_operation =
            distribution.travel_graph_code.toString() === ''
              ? ''
              : distribution.travel_graph_code.toString() +
                '-' +
                distribution.travel_graph_name +
                ' / ' +
                distribution.travel_operation_code.toString() +
                '-' +
                distribution.travel_operation_name;
          const orders =
            distribution.travel_maintenance_order_code.toString() === ''
              ? ''
              : distribution.travel_maintenance_order_code.toString() + '-' + distribution.travel_maintenance_order_name;

          recordsPrint.push({
            tipe_allowance: code_allowance,
            element: distribution.travel_costs_type_name,
            concept: coast !== '' ? coast : graph_operation !== '' ? graph_operation : orders !== '' ? orders : '',
            account:
              distribution.accounting_account_code.toString() === ''
                ? ''
                : distribution.accounting_account_code.toString() + '-' + distribution.accounting_account_name,
            distribution: distribution.distribution.toString() + '%',
          });
        });
      });

      if (recordsPrint.length > 0) {
        const columnsHeaderJourneys = ['DISTRIBUCIÓN DE COSTOS', ''];
        const dataHeaderJourneys: string[] = [];

        doc.autoTable(columnsHeaderJourneys, dataHeaderJourneys, {
          startY: doc.autoTable.previous.finalY + 10,
          pageBreak: 'avoid',
          theme: 'plain',
          styles: {
            cellPadding: 1,
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
            halign: 'left',
            textColor: 250,
          },
        });

        const columnsPdf = [
          { title: 'Gasto', dataKey: 'tipe_allowance' },
          { title: 'E.Imputación', dataKey: 'element' },
          { title: 'Concepto', dataKey: 'concept' },
          ,
          { title: 'C.Contable', dataKey: 'account' },
          { title: 'Dist', dataKey: 'distribution' },
        ];

        // let columnsPdf = [
        //   { title: 'Gasto', dataKey: "tipe_allowance" },
        //   { title: 'E.Imputación', dataKey: "element" },
        //   { title: 'C.Costo', dataKey: "center_coast" },
        //   { title: 'Grafo', dataKey: "travel_graph" },
        //   { title: 'Operación', dataKey: "travel_operation" },
        //   { title: 'C.Contable', dataKey: "account" },
        //   { title: 'Dist', dataKey: "distribution" }];

        doc.autoTable(columnsPdf, recordsPrint, {
          startY: doc.autoTable.previous.finalY,
          pageBreak: 'avoid',
          theme: 'grid',
          styles: {
            cellPadding: 1,
            fontSize: 8,
            font: 'helvetica',
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
            halign: 'center',
            textColor: 20,
          },
        });
      }
    }

    return true;
  }

  comentaries(result, doc) {
    if (result.data[0].travel_request.commentary !== null) {
      const columnsReasonJourneys = ['COMENTARIOS'];
      const dataReasonHeaderJourneys = [
        [
          result.data[0].travel_request.commentary
            .replace(/<p>/g, '')
            .replace(/&nbsp;/g, '')
            .split('/')
            .join()
            .replace(/<,p>/g, ''),
        ],
      ];

      doc.autoTable(columnsReasonJourneys, dataReasonHeaderJourneys, {
        startY: doc.autoTable.previous.finalY + 10,
        pageBreak: 'avoid',
        theme: 'plain',
        styles: {
          cellPadding: 1,
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
          fillColor: [226, 226, 226],
          fontStyle: 'normal',
          halign: 'left',
          textColor: 20,
        },
      });
    }
    return true;
  }

  approvals(result, doc) {
    if (result.data[0].travel_request.approvers_to_json.length > 0) {
      const columnsHeaderJourneys = ['APROBADORES', 'ESTADOS', 'OBSERVACIONES'];
      const dataHeaderJourneys: any[] = [];
      let arrayPrint: any[];
      let index = 0;

      result.data[0].travel_request.approvers_to_json.forEach(data => {
        if (result.data[0].travel_request.answers_to_json[index] !== undefined) {
          arrayPrint = [
            data.short_name.toString(),
            result.data[0].travel_request.answers_to_json[index].status.toString(),
            result.data[0].travel_request.answers_to_json[index].observation.toString(),
          ];
        } else {
          arrayPrint = [data.short_name.toString(), 'No gestionado', ''];
        }

        dataHeaderJourneys.push(arrayPrint);

        index += 1;
      });

      doc.autoTable(columnsHeaderJourneys, dataHeaderJourneys, {
        startY: doc.autoTable.previous.finalY + 10,
        pageBreak: 'avoid',
        theme: 'grid',
        styles: {
          cellPadding: 1,
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
          halign: 'left',
          textColor: 250,
        },
      });
    }
    return true;
  }
}
