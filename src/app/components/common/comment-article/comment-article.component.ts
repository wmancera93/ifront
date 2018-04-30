import { Component, OnInit } from '@angular/core';
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

  public infoArticle: PublicArticle;

  public commentsList: PublicArticle;
  public newComment: PublicArticle;
  public viewModal: boolean = false;
  public showSubmit: boolean = true;
  public idArticle: number;
  public numberComments: number;
  public comment: string;
  public idComment: number;
  private alertWarning: Alerts[];
  public is_collapse: boolean = false;
  public flagEditComment: boolean = false;
  public commentEdit: string;



  constructor(public billboardSharedService: BillboardService,
    public alert: AlertsService,
    public myPublicationService: MyPublicationsService) {

    this.chargeComments();

    this.alert.getActionConfirm().subscribe((data: any) => {

      if (data == "deleteComment") {
        document.getElementById("loginId").style.display = 'block'
        document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");

        this.myPublicationService.deleteComment(this.idArticle, this.idComment)
          .subscribe((data: any) => {
            if (data.success == true) {
            }
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
            this.getDetailArticle()
            setTimeout(() => {
              document.getElementById("loginId").style.display = 'none'
              document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
            }, 2000)
          })
      }
    })

  }

  ngOnInit() {

  }

  chargeComments() {
    this.billboardSharedService.getUpdateNew().subscribe((data: any) => {     
      this.idArticle = data.id;
      this.numberComments = data.total_comments;
      this.viewModal = true;
      this.getDetailArticle();
    })
  }

  getDetailArticle() {
    this.myPublicationService.getArticles(this.idArticle).subscribe((res: any) => {      
      this.infoArticle = res.data;
      this.commentsList = res.data.comments_articles;
    })

    document.getElementById('btn_show_article').click();
    document.getElementById("bodyGeneral").removeAttribute('style');
  }

  sendComment() {
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.showSubmit = false;
    if (this.flagEditComment == true) {
      this.myPublicationService.editComment(this.idArticle, this.idComment, this.commentEdit).subscribe(
        (data: any) => {
          (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
          this.showSubmit = true;
          this.numberComments = data.total_comments;
          this.comment = '';
          this.getDetailArticle();
          setTimeout(() => {
            document.getElementById("loginId").style.display = 'none'
            document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
          }, 1000)
        });
      this.flagEditComment = false;
    }
    else {
      this.myPublicationService.postComment(this.idArticle, this.comment)
        .subscribe(
          (data: any) => {
            this.showSubmit = true;
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
            this.getDetailArticle();
            this.comment = '';
            this.numberComments = data.total_comments;
            setTimeout(() => {
              document.getElementById("loginId").style.display = 'none'
              document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
            }, 1000)

          },
          (error: any) => {
            (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
            const alertWarning: Alerts[] = [{ type: 'danger', title: 'Solicitud Denegada', message: error.error.errors.toString(), confirmation: false }];
            this.showSubmit = true;
            this.alert.setAlert(alertWarning[0]);

            setTimeout(() => {
              document.getElementById("loginId").style.display = 'none'
              document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
            }, 1000)
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
