import { Component, OnInit } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service';
import { Certificate } from '../../../models/common/auto_services/auto_services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payroll-receipts',
  templateUrl: './payroll-receipts.component.html',
  styleUrls: ['./payroll-receipts.component.css']
})
export class PayrollReceiptsComponent implements OnInit {
  public listPayRoll: Certificate;
  public urlPDF: string = '';
  constructor(public autoServiceService: AutoServicesService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.autoServiceService.getPayRollReceipts().subscribe((data: any) => {
      this.listPayRoll = data.data;
      this.urlPDF = this.listPayRoll[0].file.url;
    })
  }

  selectedObject(select: Certificate) {
    this.urlPDF = select.file.url;
  }

}
