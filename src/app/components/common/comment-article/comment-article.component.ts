import { Component, OnInit, Input } from '@angular/core';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { PublicArticle } from '../../../models/common/billboard/my_publications';
import { FormGroup } from '@angular/forms';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';


@Component({
  selector: 'app-comment-article',
  templateUrl: './comment-article.component.html',
  styleUrls: ['./comment-article.component.css']
})
export class CommentArticleComponent implements OnInit {
  @Input('nameModal') nameModal: any
  public targetModal: string = '';
  public btnModal: string = '';
  public nameThisModal: string = '';

  public infoArticle: PublicArticle = null;

  public commentsList: PublicArticle;
  public newComment: PublicArticle;
  public viewModal: boolean = true;
  public showSubmit: boolean = true;
  public idArticle: number = null;
  public numberComments: number = null;
  public comment: string;
  public idComment: number;
  private alertWarning: Alerts[];
  public is_collapse: boolean = false;
  public flagEditComment: boolean = false;
  public commentEdit: string;


  constructor(public billboardSharedService: BillboardService,
    public alert: AlertsService,
    public myPublicationService: MyPublicationsService) {

    this.billboardSharedService.getShowCommentNew().subscribe((data: any) => {
      this.idArticle = data.objectPublication.id;
      this.numberComments = data.objectPublication.total_comments;
      this.getDetailArticle(data.modal);
    })

    this.alert.getActionConfirm().subscribe((data: any) => {
      if (data == "deleteComment") {

        this.myPublicationService.deleteComment(this.idArticle, this.idComment)
          .subscribe((data: any) => {
            if (data.success == true) {
            }
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
            this.getDetailArticle()
            
          })
      }
    })

  }

  ngOnInit() {
    this.nameModal.subscribe((data: any) => {
      this.targetModal = '#' + data;
      this.btnModal = 'btn-' + data;
      this.nameThisModal = data;
    })

  }


  getDetailArticle(modal?: string) {
    this.infoArticle = null;
    this.myPublicationService.getArticles(this.idArticle).subscribe((res: any) => {
      this.infoArticle = res.data;
      this.commentsList = res.data.comments_articles;
      if (document.getElementById(modal).className !== 'modal show') {
        document.getElementById('btn-' + modal).click();
        document.getElementById("bodyGeneral").removeAttribute('style');
      }
    })
  }

  sendComment() {
    this.showSubmit = false;
    if (this.flagEditComment == true) {
      this.myPublicationService.editComment(this.idArticle, this.idComment, this.commentEdit).subscribe(
        (data: any) => {
          (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
          this.showSubmit = true;
          this.numberComments = data.total_comments;
          this.comment = '';
          this.getDetailArticle();
        
        });
      this.flagEditComment = false;
    }
    else {
      this.myPublicationService.postComment(this.idArticle, this.comment)
        .subscribe(
          (data: any) => {
            this.showSubmit = true;            
            this.getDetailArticle();
            this.comment = '';
            this.numberComments = data.total_comments;
            const alertWarning: Alerts[] = [{ 
            type: 'success',
            title: 'Confirmación',
            message: 'Comentario guardado exitosamente',
            confirmation: false,
            typeConfirmation: ''}];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);

          },
          (error: any) => {
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
            const alertWarning: Alerts[] = [{ 
              type: 'danger',
              title: 'Solicitud Denegada',
              message: error.error.errors.toString(),
              confirmation: false }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);
   
          }
        )
    }
  }

  deleteComment(commentObject: any) {
    this.idArticle = commentObject.article_id;
    this.idComment = commentObject.id;
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el comentario?',
      confirmation: true,
      typeConfirmation: 'deleteComment'
    }];
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


}
