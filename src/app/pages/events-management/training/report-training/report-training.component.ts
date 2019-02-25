import { EventEmitter } from '@angular/core';
import { TrainingService } from './../../../../services/training/training.service';
import { DataDableSharedService } from './../../../../services/shared/common/data-table/data-dable-shared.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/general/user';
import { Translate } from '../../../../models/common/translate/translate';
import { TranslateService } from '../../../../services/common/translate/translate.service';

@Component({
  selector: 'app-report-training',
  templateUrl: './report-training.component.html',
  styleUrls: ['./report-training.component.css']
})
export class ReportTrainingComponent implements OnInit {

  public collapseFilterTraining: boolean = false;
  public showDataTableTraining: boolean = true;
  public is_collapse_report_training: boolean = false
  public showExcel: boolean = true;
  public showPdf: boolean = false;
  public nameReport: string;

  public report_list_training = null;
  public userId: User = null;

  public personal_number = '';
  public code_training: string = '-1';
  public status_id: number = -1;
  public date_begin: string = '';
  public date_end: string = '';
  public countAfter: number = 0;
  public translate: Translate = null;
  title

  public objectGeneralTraining: any[] = [];
  public objectReportTraining: EventEmitter<any> = new EventEmitter();

  constructor(private actionDataTableService: DataDableSharedService, public training_report_list: TrainingService, public translateService: TranslateService) {
    this.translate = this.translateService.getTranslate();

    this.nameReport = this.translate.app.frontEnd.pages.events_management.training.report_training.text_training_agreements_ts;

    this.actionDataTableService.getActionDataTable().subscribe((data: any) => {
      if (data === this.nameReport && this.countAfter === 0) {
        this.getObjectPrint('Excel');
      }
      if (data.action_method === 'showConvenio' && this.countAfter === 0) {
        this.training_report_list.getTrainingEventsByID(data.id).subscribe((data: any) => {
          let viewAgreement = data.data.pdf.url;
          window.open(viewAgreement);
        });
      }
    });

  }

  ngOnInit() {
    this.getObjectPrint('general');
    this.userId = JSON.parse(localStorage.getItem('user')).employee_id;
  }


  collapseReportTraining(is_collapse: boolean) {
    this.collapseFilterTraining = is_collapse;
    this.personal_number = '';
    this.code_training = '';
    this.status_id = -1;
    this.date_begin = '';
    this.date_end = '';

    this.getObjectPrint('general');
  }

  getObjectPrint(param) {
    let personal_number_send = this.personal_number === '' ? '-1' : this.personal_number;
    let code_training_send = this.code_training === '' ? '-1' : this.code_training;
    let date_begin_send = this.date_begin === '' ? '-1' : this.date_begin.replace('-', '').toString().replace('-', '');
    let date_end_send = this.date_end === '' ? '-1' : this.date_end.replace('-', '').toString().replace('-', '');

    if (param === 'general') {
      this.training_report_list.getTrainingAgreementsReport(personal_number_send, code_training_send, this.status_id, date_begin_send, date_end_send)
        .subscribe((data: any) => {
          this.objectGeneralTraining = data.data[0].data;
          if (this.objectGeneralTraining.length > 0) {
            this.objectReportTraining.emit(data);
          } else {
            this.showDataTableTraining = false;
          }
        });
      this.showDataTableTraining = true;
    } else {
      this.training_report_list.getTrainingAgreementsReportExcel(this.userId, personal_number_send, code_training_send, this.status_id, date_begin_send, date_end_send)
        .subscribe((data: any) => {
          window.open(data.url);
        });
    }

  }

  ngOnDestroy() {
    this.countAfter += 1;
  }

}
