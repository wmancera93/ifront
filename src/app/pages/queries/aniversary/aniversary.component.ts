import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-aniversary',
  templateUrl: './aniversary.component.html',
  styleUrls: ['./aniversary.component.css']
})
export class AniversaryComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public showExcel = true;
  public userAuthenticated: User;
  public countAfter = 0;
  private subscriptions: ISubscription[];

  parseT(key) {
    return `pages.queries.aniversary.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private accionDataTableService: DataDableSharedService
  ) {}

  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });

    this.subscriptions = [
      this.accionDataTableService.getActionDataTable().subscribe(data => {
        this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
        this.queriesService
          .getAniversaryExcel(this.userAuthenticated.employee_id.toString())
          .subscribe((info: any) => {
            window.open(info.url);
          });
      }),
      this.queriesService.getAniversary().subscribe(
        (data: any) => {
          this.objectReport.emit(data);
        },
        error => {
          console.log(error.error);
        }
      )
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
