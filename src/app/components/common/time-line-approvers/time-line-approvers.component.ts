import { Component, OnInit } from '@angular/core';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { RequestsRh, ListRequests, DetailRequest } from '../../../models/common/requests-rh/requests-rh';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-time-line-approvers',
  templateUrl: './time-line-approvers.component.html',
  styleUrls: ['./time-line-approvers.component.css']
})
export class TimeLineApproversComponent implements OnInit {
  public detailRequets: DetailRequest[] = [];
  public fileSupport: string = '';
  public viewModal: boolean = false;

  constructor(private aproversRequestsService: AproversRequestsService,
    private requestsRhService: RequestsRhService,
    public stylesExplorerService: StylesExplorerService) {
    this.aproversRequestsService.getRequests().subscribe(
      (data: any) => {
        // if (data.flag_count) {
        //   data.flag_count = false;
          this.requestsRhService.getRequestDetailById(data.ticket)
            .subscribe((detail: any) => {
              this.detailRequets = [];
              if (detail.success) {
                this.detailRequets = detail.data;
                this.fileSupport = this.detailRequets[0].request.file_support.url;

                if (document.getElementById('aprovers_requests').className !== 'modal show') {
                  document.getElementById('btn_aprovers_requests').click();
                  document.getElementById("bodyGeneral").removeAttribute('style');
                }

                this.viewModal = true;
              }
            })
        // }


      }
    )

  }

  ngOnInit() {
    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 400);
  }

  viewSupport() {
    window.open(this.fileSupport);
  }

}
