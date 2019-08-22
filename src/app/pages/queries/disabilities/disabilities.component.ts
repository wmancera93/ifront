import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-disabilities',
  templateUrl: './disabilities.component.html',
  styleUrls: ['./disabilities.component.css'],
})
export class DisabilitiesComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showExcel = true;
  public userAuthenticated: User;
  public countAfter = 0;

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  parseT(key) {
    return `pages.queries.disabilities.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.accionDataTableService.getActionDataTable().subscribe(data => {
      if (data === this.t('name_table_ts') && this.countAfter === 0) {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getDisabilitiesExcel(this.userAuthenticated.employee_id.toString())
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }
    });
    this.queriesService.getDisabilities().subscribe(
      (data: any) => {
        this.objectReport.emit(data);
      },
      error => {
        console.log(error.error);
      },
    );
  }

  ngOnDestroy() {
    this.countAfter += 1;
  }
}
