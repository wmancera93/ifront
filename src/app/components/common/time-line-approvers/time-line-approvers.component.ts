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
  public countAfter: number = 0;
  public dateFirts: string;
  public dateFinally: string;

  constructor(private aproversRequestsService: AproversRequestsService,
    private requestsRhService: RequestsRhService,
    public stylesExplorerService: StylesExplorerService) {
    this.aproversRequestsService.getRequests().subscribe(
      (data: any) => {
        if (this.countAfter === 0) {
          this.requestsRhService.getRequestDetailById(data.ticket)
            .subscribe((detail: any) => {
              this.detailRequets = [];
              if (detail.success) {
                this.detailRequets = detail.data;
                this.fileSupport = this.detailRequets[0].request.image.url;
                
                let dateBegin = this.detailRequets[0].request.date_begin_format !== null ? this.detailRequets[0].request.date_begin_format.split('/') : null;
                if (dateBegin !== null) {
                  this.dateFirts = dateBegin[1] + '/' + dateBegin[0] + '/' + dateBegin[2];
                }
                
                let dateEnd = this.detailRequets[0].request.date_end_format !== null ? this.detailRequets[0].request.date_end_format.split('/') : null;
                if (dateEnd  !== null) {
                  this.dateFinally = dateEnd[1] + '/' + dateEnd[0] + '/' + dateEnd[2];
                }


                if (document.getElementById('aprovers_requests').className !== 'modal show') {
                  document.getElementById('btn_aprovers_requests').click();
                  document.getElementById("bodyGeneral").removeAttribute('style');
                }
                this.viewModal = true;
              }
            })
        }
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

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
