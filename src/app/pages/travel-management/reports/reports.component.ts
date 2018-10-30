import { Component, OnInit } from '@angular/core';
import { TravelService } from '../../../services/travel-management/travels/travel.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  token
  public typesReport: any[] = [];
  public titleReport: string = 'Historico de modificaciones'

  constructor(public travelService: TravelService) {
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
