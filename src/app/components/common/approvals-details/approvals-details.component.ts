import { Component, OnInit } from '@angular/core';
import { AproversRequestsService } from '../../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { DetailAproverRequest } from '../../../models/common/approver-requests/approver_requests';

@Component({
  selector: 'app-approvals-details',
  templateUrl: './approvals-details.component.html',
  styleUrls: ['./approvals-details.component.css']
})
export class ApprovalsDetailsComponent implements OnInit {
  public approvals: DetailAproverRequest[] = []

  constructor(public approverRequestsService: ApproverRequestsService,
    public aproversRequestsService: AproversRequestsService) {

    this.aproversRequestsService.getAprovalsRequests()
      .subscribe((data: any) => {
        this.approverRequestsService.getDetailApprovalsRequests(data.id)
          .subscribe((request: any) => {
            this.approvals[0] = request.data[0].request;
            console.log(this.approvals[0])
          })

        if (document.getElementById('approvals_requests').className !== 'modal show') {
          document.getElementById('btn_approvals_requests').click();
          document.getElementById("bodyGeneral").removeAttribute('style');
        }

      })
  }

  ngOnInit() {

  }

}
