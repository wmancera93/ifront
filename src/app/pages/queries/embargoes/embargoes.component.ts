import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-embargoes',
  templateUrl: './embargoes.component.html',
  styleUrls: ['./embargoes.component.css'],
})
export class EmbargoesComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showExcel = true;
  public userAuthenticated: User;
  private subscriptions: ISubscription[];


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.queries.embargoes.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService,
  ) {}

  ngOnInit() {
    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe(() => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getEmbargoesExcel(this.userAuthenticated.employee_id.toString())
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }),
      this.queriesService.getEmbargoes().subscribe(
        (data: any) => {
          this.objectReport.emit(data);
        },
        error => {
          console.log(error.error);
        },
      ),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
