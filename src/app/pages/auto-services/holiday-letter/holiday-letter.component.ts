import { Component, OnInit } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service'
import { Certificate } from '../../../models/common/auto_services/auto_services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-holiday-letter',
  templateUrl: './holiday-letter.component.html',
  styleUrls: ['./holiday-letter.component.css']
})
export class HolidayLetterComponent implements OnInit {
  public holidayLetter: Certificate[] = [];
  public urlPDF: string = '';
  public flagEmpty: boolean;

  constructor(public autoServiceService: AutoServicesService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.autoServiceService.getHolidayLetter().subscribe((data: any) => {
      this.holidayLetter = data.data;
      if (this.holidayLetter.length === 0) {
        this.flagEmpty = true;
      }
      else {
        this.flagEmpty = false;
        this.urlPDF = this.holidayLetter[0].file.url;
      }


    })
  }

  selectedObject(select: Certificate) {
    this.urlPDF = select.file.url;
  }
}
