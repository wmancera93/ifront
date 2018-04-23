import { Component, OnInit } from '@angular/core';
import { RequestsRhService } from '../../services/requests-rh/requests-rh.service';
import { RequestsRh, ListRequests, TypesRequests } from '../../models/common/requests-rh/requests-rh';
import { AproversRequestsService } from '../../services/shared/common/aprovers-requestes/aprovers-requests.service';
import { FormsRequestsService } from '../../services/shared/forms-requests/forms-requests.service';

@Component({
  selector: 'app-requests-rh',
  templateUrl: './requests-rh.component.html',
  styleUrls: ['./requests-rh.component.css']
})
export class RequestsRhComponent implements OnInit {
  public requests: RequestsRh;
  public viewContainer: boolean = false;

  constructor(private requestsRhService: RequestsRhService,
    private aproversRequestsService: AproversRequestsService,
    public formsRequestsService: FormsRequestsService) {
    
  }

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.requestsRhService.getAllRequests().subscribe((data: any) => {
      if (data.success) {
        this.requests = data.data[0];
        this.viewContainer = true;
      }else {
        this.viewContainer = false;
      }
    })

  }

 

  modalAprovers(request: ListRequests) {
    this.aproversRequestsService.setRequests(request);
  }

  newForm(typeForm: TypesRequests){
    this.formsRequestsService.setFormRequests(typeForm);
  }

}
