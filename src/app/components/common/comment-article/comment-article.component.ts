import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { StylesExplorerService } from '../../../services/common/styles-explorer/styles-explorer.service';
import { TranslateService } from '@ngx-translate/core';
import { ISubscription } from 'rxjs/Subscription';
import { JoyrideAppService } from '../../../services/joyride-app/joyride-app.service';

@Component({
  selector: 'app-comment-article',
  templateUrl: './comment-article.component.html',
  styleUrls: ['./comment-article.component.css'],
})
export class CommentArticleComponent implements OnInit {
  @Input('nameModal') nameModal: any;
  public targetModal = '';
  public btnModal = '';
  public nameThisModal = '';
  public infoArticle: PublicArticle = null;
  private subscriptions: ISubscription[] = [];
  public commentsList: PublicArticle;
  public newComment: PublicArticle;
  public viewModal = true;
  public showSubmit = true;
  public idArticle: number = null;
  public numberComments: number = null;
  public comment: string;
  public idComment: number;
  private alertWarning: Alerts[];
  public is_collapse = false;
  public flagEditComment = false;
  public commentEdit: string;
  public modalName = '';
  public flagRefreshPublication = false;
  private steps = ['step_1', 'step_2', 'step_3'];

  t(key) {
    return this.translate.instant(this.parseT(key));
  }

  joyride(step: string) {
    return `${this.parseT('joyride')}.${step}`;
  }

  parseT(key) {
    return `components.common.comment_article.${key}`;
  }

  constructor(
    public billboardSharedService: BillboardService,
    public alert: AlertsService,
    public myPublicationService: MyPublicationsService,
    public stylesExplorerService: StylesExplorerService,
    public translate: TranslateService,
    public joyrideAppService: JoyrideAppService,
  ) {
    this.subscriptions.push(
      this.alert.getActionConfirm().subscribe((data: any) => {
        if (data === 'continueExit') {
          this.getDetailArticle();
        }
      }),
    );

    this.subscriptions.push(
      this.billboardSharedService.getShowCommentNew().subscribe((data: any) => {
        this.idArticle = data.objectPublication.id;
        this.numberComments = data.objectPublication.total_comments;
        this.modalName = data.modal;
        this.getDetailArticle(data.modal);
      }),
    );

    this.subscriptions.push(
      this.alert.getActionConfirm().subscribe((data: any) => {
        if (data == 'deleteComment') {
          this.myPublicationService.deleteComment(this.idArticle, this.idComment).subscribe((data: any) => {
            if (data.success == true) {
            }
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
            this.getDetailArticle();
          });
        }
      }),
    );
    this.subscriptions.push(
      joyrideAppService.onStartTour.subscribe(() => {
        this.subscriptions.push(joyrideAppService.startTour({ steps: this.steps }).subscribe(() => {}));
      }),
    );
  }

  ngOnInit() {
    this.nameModal.subscribe((data: any) => {
      this.targetModal = '#' + data;
      this.btnModal = 'btn-' + data;
      this.nameThisModal = data;
    });

    setTimeout(() => {
      this.stylesExplorerService.addStylesCommon();
    }, 1000);
  }

  getDetailArticle(modal?: string) {
    if (modal !== undefined) {
      this.infoArticle = null;
      if (document.getElementById(modal).className !== 'modal show') {
        document.getElementById('btn-' + modal).click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
      this.myPublicationService.getArticles(this.idArticle).subscribe((res: any) => {
        this.infoArticle = res.data;
        this.commentsList = res.data.comments_articles;
      });
    } else {
      this.infoArticle = null;
      if (document.getElementById(this.modalName).className !== 'modal show') {
        document.getElementById('btn-' + this.modalName).click();
        document.getElementById('bodyGeneral').removeAttribute('style');
      }
      this.myPublicationService.getArticles(this.idArticle).subscribe((res: any) => {
        this.infoArticle = res.data;
        this.commentsList = res.data.comments_articles;
      });
    }
  }

  sendComment() {
    this.showSubmit = false;
    if (this.flagEditComment == true) {
      this.myPublicationService.editComment(this.idArticle, this.idComment, this.commentEdit).subscribe((data: any) => {
        (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
        this.showSubmit = true;
        this.numberComments = data.total_comments;
        this.comment = '';
        this.getDetailArticle();
      });
      this.flagEditComment = false;
    } else {
      this.myPublicationService.postComment(this.idArticle, this.comment).subscribe(
        (data: any) => {
          this.showSubmit = true;
          this.comment = '';
          this.numberComments = data.total_comments;
          (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
          const alertWarning: Alerts[] = [
            {
              type: 'success',
              title: this.t('type_alert_confirmation_ts'),
              message: this.t('msg_alert_save_ts'),
              confirmation: true,
              typeConfirmation: 'continueExit',
            },
          ];
          this.showSubmit = true;
          this.flagRefreshPublication = true;
          this.alert.setAlert(alertWarning[0]);
          this.billboardSharedService.setRefreshEditNew(this.flagRefreshPublication);
        },
        (error: any) => {
          (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
          const alertWarning: Alerts[] = [
            {
              type: 'danger',
              title: this.t('type_alert_denied_ts'),
              message: error.error.errors.toString(),
              confirmation: true,
              typeConfirmation: 'continueError',
            },
          ];
          this.showSubmit = true;
          this.alert.setAlert(alertWarning[0]);
        },
      );
    }
  }

  deleteComment(commentObject: any) {
    this.idArticle = commentObject.article_id;
    this.idComment = commentObject.id;
    this.alertWarning = [
      {
        type: 'warning',
        title: this.t('type_alert_confirmation_ts'),
        message: this.t('type_alert_confirmation_ts'),
        confirmation: true,
        typeConfirmation: 'deleteComment',
      },
    ];
    this.alert.setAlert(this.alertWarning[0]);
  }

  editComment(commentObjectEdit: any) {
    this.flagEditComment = true;
    (<HTMLInputElement>document.getElementById('comment')).disabled = true;
    this.idArticle = commentObjectEdit.article_id;
    this.idComment = commentObjectEdit.id;
  }
  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }

  closeModal() {
    $ && $(this.targetModal).modal('hide');
  }
}
