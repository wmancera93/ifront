import { Component, OnInit } from '@angular/core';
import { ApproverRequestsService } from '../../../services/approver-requests/approver-requests.service';
import { AproverRequests } from '../../../models/common/approver-requests/approver_requests';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.css']
})
export class PendingsComponent implements OnInit {
  public pendings: AproverRequests = null;

  constructor(public approverRequestsService: ApproverRequestsService) {
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    this.approverRequestsService.getApprovalsRequestsPending()
      .subscribe((data: any) => {
        if (data.success) {
          this.pendings = data.data[0];
        }

        setTimeout(() => {
          document.getElementById("loginId").style.display = 'none'
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
        }, 1000)
      });
  }

}
