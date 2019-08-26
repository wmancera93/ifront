import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';
import { User } from '../../../models/general/user';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-historical-posts',
  templateUrl: './historical-posts.component.html',
  styleUrls: ['./historical-posts.component.css'],
})
export class HistoricalPostsComponent implements OnInit, OnDestroy {
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string;
  public token: boolean;
  public showExcel = true;
  public userAuthenticated: User;
  public countAfter = 0;
  private subscriptions: ISubscription[];

  @Output() objectToken: EventEmitter<any> = new EventEmitter();


  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.queries.historical_posts.${key}`;
  }

  constructor(
    public queriesService: QueriesService,
    private tokenService: Angular2TokenService,
    private accionDataTableService: DataDableSharedService,
  ) {
    this.subscriptions = [
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
      ),
    ];
  }

  ngOnInit() {
    this.subscriptions = [
      ...this.subscriptions,
      this.accionDataTableService.getActionDataTable().subscribe(data => {
        if (data === this.nameReport && this.countAfter === 0) {
          this.userAuthenticated = JSON.parse(localStorage.getItem('user'));
          this.queriesService
            .getHistoricalPositionExcel(
              this.userAuthenticated.employee_id.toString(),
            )
            .subscribe((info: any) => {
              window.open(info.url);
            });
        }
      }),
      this.queriesService.getHistoricalPosts().subscribe((data: any) => {
        this.objectReport.emit(data);
      }),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
