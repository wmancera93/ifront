import { Component, OnInit } from '@angular/core';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { RequestsRhService } from '../../../services/requests-rh/requests-rh.service';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-time-line-approvers',
  templateUrl: './time-line-approvers.component.html',
  styleUrls: ['./time-line-approvers.component.css'],
})
export class TimeLineApproversComponent implements OnInit {
  public detailRequets: any[] = [];
  public fileSupport = '';
  public viewModal = false;
  public countAfter = 0;
  public dateFirts: string;
  public dateFinally: string;
  public requests_print: string;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `components.common.time_line_approvers.${key}`;
  }

  constructor(private aproversRequestsService: AproversRequestsService, private requestsRhService: RequestsRhService, public stylesExplorerService: StylesExplorerService, public translate: TranslateService) {
    this.aproversRequestsService.getRequests().subscribe((data: any) => {
      if (data.type_request == 'requestsOnly') {
        this.requests_print = data.type_request;
        if (this.countAfter === 0) {
          this.requestsRhService.getRequestDetailById(data.request.ticket).subscribe((detail: any) => {
            this.detailRequets = [];
            if (detail.success) {
              this.detailRequets = detail.data;
              this.fileSupport = this.detailRequets[0].request.image.url;

              const dateBegin = this.detailRequets[0].request.date_begin_format !== null ? this.detailRequets[0].request.date_begin_format.split('/') : null;
              if (dateBegin !== null) {
                this.dateFirts = dateBegin[1] + '/' + dateBegin[0] + '/' + dateBegin[2];
              }
              const dateEnd = this.detailRequets[0].request.date_end_format !== null ? this.detailRequets[0].request.date_end_format.split('/') : null;
              if (dateEnd) {
                this.dateFinally = dateEnd[1] + '/' + dateEnd[0] + '/' + dateEnd[2];
              }

              if (document.getElementById('aprovers_requests').className !== 'modal show') {
                document.getElementById('btn_aprovers_requests').click();
                document.getElementById('bodyGeneral').removeAttribute('style');
              }
              this.viewModal = true;
            }
          });
        }
      }
      if (data.type_request == 'requestsTravels') {
        this.detailRequets = [];
        this.requests_print = data.type_request;

        const dateBegin = data.request.date_begin !== null ? data.request.date_begin.split('-') : null;
        if (dateBegin !== null) {
          this.dateFirts = dateBegin[2] + '/' + dateBegin[1] + '/' + dateBegin[0];
        }
        const dateEnd = data.request.date_end !== null ? data.request.date_end.split('-') : null;
        if (dateEnd) {
          this.dateFinally = dateEnd[2] + '/' + dateEnd[1] + '/' + dateEnd[0];
        }

        this.detailRequets.push({
          message_pending_level_approver: null,
          pending_level_approver: data.request.pending_level_approver,
          request: {
            date_begin_format: data.request.date_begin,
            date_end_format: data.request.date_end,
            days_request: null,
            observation_request: data.request.observation,
            created_date: data.request.created_date,
            answers_to_json: data.request.answers_to_json,
            employee_applicant_to_json: data.request.employee_applicant_to_json,
            image: {
              url: '',
            },
            type_requests_name: data.request.travel_requests_type_name,
          },
          title: this.t('detail_requests') + data.request.ticket,
        });
        this.fileSupport = null;

        if (document.getElementById('aprovers_requests').className !== 'modal show') {
          document.getElementById('btn_aprovers_requests').click();
          document.getElementById('bodyGeneral').removeAttribute('style');
        }
        this.viewModal = true;
      }
    });
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
