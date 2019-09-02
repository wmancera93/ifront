import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AutoServicesService } from '../../../services/auto-services/auto-services.service';
import { Certificate } from '../../../models/common/auto_services/auto_services';
import { DomSanitizer } from '@angular/platform-browser';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';

@Component({
  selector: 'app-holiday-letter',
  templateUrl: './holiday-letter.component.html',
  styleUrls: ['./holiday-letter.component.css'],
})
export class HolidayLetterComponent implements OnInit {
  public holidayLetter: Certificate[] = [];
  public urlPDF = '';
  public flagEmpty: boolean;

  public token: boolean;
  @Output() objectToken: EventEmitter<any> = new EventEmitter();


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.auto_services.holiday_letter.${key}`;
  }

  constructor(
    public autoServiceService: AutoServicesService,
    public sanitizer: DomSanitizer,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
  ) {
    this.tokenService.validateToken().subscribe(
      () => {
        this.token = false;
      },
      error => {
        this.objectToken.emit({
          title: error.status.toString(),
          message: error.json().errors[0].toString(),
        });
        document
          .getElementsByTagName('body')[0]
          .setAttribute('style', 'overflow-y:hidden');
        this.token = true;
      },
    );
    // document.getElementById("loginId").style.display = 'block'
    // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
  }

  ngOnInit() {
    this.autoServiceService.getHolidayLetter().subscribe((data: any) => {
      this.holidayLetter = data.data;
      if (this.holidayLetter.length === 0) {
        this.flagEmpty = true;
      } else {
        this.flagEmpty = false;
        this.urlPDF = this.holidayLetter[0].file.url;
      }
    });

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  selectedObject(select: Certificate) {
    this.urlPDF = select.file.url;
  }
}
