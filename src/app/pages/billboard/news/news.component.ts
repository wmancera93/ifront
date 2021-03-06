import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { ISubscription } from 'rxjs/Subscription';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit, OnDestroy {
  @Output() newModal: EventEmitter<string> = new EventEmitter();

  public titleNew: string;
  public newList: PublicArticle[] = [];
  public uploadNewList: PublicArticle[] = [];
  public searchNotice = '';
  public validateNoData = false;
  public token: boolean;
  public seacrhNew: string;
  private subscriptions: ISubscription[];
  private subscriptionArticles: ISubscription;
  private steps = [
    'step_1',
    'step_2',
    'step_3',
    'step_4',
    'step_5',
    'step_1_comment_article',
    'step_2_comment_article',
    'step_3_comment_article',
  ];

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.billboard.news.${key}`;
  }

  constructor(
    public myPublicationsService: MyPublicationsService,
    public billboardSharedService: BillboardService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public joyrideAppService: JoyrideAppService,
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
          document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y:hidden');
          this.token = true;
        },
      ),
      this.billboardSharedService.getRefreshEditNew().subscribe(() => {
        this.consultAllArticles();
      }),
    ];

    this.subscriptions.push(
      joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(joyrideAppService.startTour({ steps: this.steps }).subscribe(() => {}));
      }),
    );
  }

  ngOnInit() {
    this.consultAllArticles();
    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  consultAllArticles() {
    this.subscriptionArticles = this.myPublicationsService.getAllArticles().subscribe((data: any) => {
      this.newList = data.data;
    });
  }

  enterTitleNew() {
    this.searchNotice = this.titleNew;
  }

  goToSearchTitleNew() {
    this.uploadNewList = this.newList;
    if (this.searchNotice == '') {
      this.validateNoData = false;
      this.consultAllArticles();
    } else {
      this.newList = this.newList.filter((pub: any) => pub.title.toLowerCase().indexOf(this.searchNotice) >= 0);
      if (this.newList.length == 0) {
        this.validateNoData = true;
      }
      this.searchNotice = '';
    }
  }
  viewDetailNew(article: any) {
    this.newModal.emit('newModal');

    setTimeout(() => {
      this.billboardSharedService.setShowCommentNew({
        objectPublication: article,
        modal: 'newModal',
      });
    }, 500);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptionArticles.unsubscribe();
  }
}
