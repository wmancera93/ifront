import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../../services/travel-management/travels/travel.service';
import { ReportTravelsService } from '../../../services/travel-management/report/report-travels.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  token
  public typesReport: any[] = [];
  public titleReport: string = 'Historico de modificaciones'

  constructor(public travelService: TravelService, public reportTravelsService: ReportTravelsService) {
    this.typesReport.push(
      {
        id: 1,
        name: "Historico de modificaciones"
      },
      {
        id: 2,
        name: "Historico de modificaciones 2.0"
      }
    )

    this.travelService.getHistoricalTravelRequests('479').subscribe(data => {
      console.log(data)
    });

  }

  ngOnInit() {

    this.reportTravelsService.getTravelsRequestsReport('576').subscribe((data: any) => {
      console.log(data)
    })
    this.reportTravelsService.getTravelsRequestsReportExcel('576').subscribe((data: any) => {
      console.log(data)
    })

  }

  selectTypeReport(report) {
    this.titleReport = report.name;

    switch (report.id) {
      case 1:
        this.travelService.getHistoricalTravelRequests('479').subscribe(data => {
          console.log(data)
        });
        break;
      case 2:
        console.log(2);
        break;

      default:
        break;
    }
  }

}
