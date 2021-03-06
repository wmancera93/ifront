import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { Alerts } from '../../../models/common/alerts/alerts';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { EditArticleService } from '../../../services/shared/common/edit-article/edit-article.service';
import { Angular2TokenService } from 'angular2-token';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css'],
})
export class MyPublicationsComponent implements OnInit, OnDestroy {
  @Output() myPublicationModal: EventEmitter<string> = new EventEmitter();
  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  public myPublications: PublicArticle[] = [];
  public totalNews = 0;
  private alertWarning: Alerts[];
  public idDelete = 0;
  public token: boolean;
  private steps = [
    'step_1',
    'step_2',
    'step_3',
    'step_4',
    'step_1_new_article',
    'step_2_new_article',
    'step_5',
    'step_6',
    'step_1_comment_article',
    'step_2_comment_article',
    'step_3_comment_article',
    'step_7',
    'step_8',
    'step_9',
    'step_1_edit_article',
    'step_2_edit_article',
    'step_3_edit_article',
    'step_4_edit_article',
    'step_5_edit_article',
    'step_6_edit_article',
    'step_10',
  ];

  private subscriptions: ISubscription[];
  private subscriptionArticles: ISubscription;
  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `pages.billboard.my_publication.${key}`;
  }

  constructor(
    public myPublicationsService: MyPublicationsService,
    public alert: AlertsService,
    public billboardSharedService: BillboardService,
    public editEditSharedService: EditArticleService,
    private tokenService: Angular2TokenService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
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
      this.billboardSharedService.getUpdateNew().subscribe((data: any) => {
        if (data == true) {
          this.getDataPublications();
        }
      }),
      this.billboardSharedService.getRefreshEditNew().subscribe((response: any) => {
        if (response == true) {
          this.getDataPublications();
        }
      }),
      this.alert.getActionConfirm().subscribe((data: any) => {
        if (data == 'deleteArticle') {
          // document.getElementById("loginId").style.display = 'block'
          // document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.subscriptionArticles = this.myPublicationsService.deleteArticles(this.idDelete).subscribe((res: any) => {
            if (res.success == true) {
              this.getDataPublications();
              this.alertWarning = [
                {
                  type: 'success',
                  title: this.t('title_confirmation_ts_one'),
                  message: this.t('msg_confirmation_ts'),
                  confirmation: false,
                  typeConfirmation: '',
                },
              ];
              this.alert.setAlert(this.alertWarning[0]);
            }
            // setTimeout(() => {
            //   document.getElementById("loginId").style.display = 'none'
            //   document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
            // }, 2000)
          });
        }
      }),
    ];
    this.subscriptions.push(
      joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(joyrideAppService.startTour({ steps: this.steps }).subscribe(() => {}));
      }),
    );
  }

  ngOnInit() {
    this.getDataPublications();

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  getDataPublications() {
    this.subscriptionArticles = this.myPublicationsService.getMyArticles().subscribe((data: any) => {
      this.myPublications = data.data;
    });
  }

  goToForm() {
    document.getElementById('btn-newArt').click();
    document.getElementById('bodyGeneral').removeAttribute('style');
  }

  publishArticle(infoPub: PublicArticle) {
    const parameter = infoPub.id;
    this.subscriptionArticles = this.myPublicationsService.putPublishNews(parameter).subscribe((data: any) => {
      infoPub.publish = data.data[0].publish;
    });
  }
  hideArticle(infoPub: PublicArticle) {
    const parameter = infoPub.id;
    this.subscriptionArticles = this.myPublicationsService.putPublishNews(parameter).subscribe((data: any) => {
      infoPub.publish = data.data[0].publish;
    });
  }

  viewDetailArticle(infoPub: any) {
    this.myPublicationModal.emit('myPublicationModal');
    setTimeout(() => {
      this.billboardSharedService.setShowCommentNew({
        objectPublication: infoPub,
        modal: 'myPublicationModal',
      });
    }, 500);
  }

  editNew(infoPub: PublicArticle) {
    this.editEditSharedService.setEditNew(infoPub);
  }

  deleteNew(infoPub: PublicArticle) {
    this.idDelete = infoPub.id;
    this.alertWarning = [
      {
        type: 'warning',
        title: this.t('title_confirmation_ts_one'),
        message: this.t('msg_elimination_confirmation_ts'),
        confirmation: true,
        typeConfirmation: 'deleteArticle',
      },
    ];
    this.alert.setAlert(this.alertWarning[0]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptionArticles.unsubscribe();
  }
}
