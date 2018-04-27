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
  public newComment : PublicArticle;
  public viewModal: boolean = false;
  public showSubmit: boolean = true;
  public idArticle: number;
  public numberComments: number;
  public comment: string;
  public idComment: number;
  private alertWarning: Alerts[];  
  public is_collapse: boolean = false;
 


  constructor(public billboardSharedService: BillboardService,
    public alert: AlertsService,
    public myPublicationService: MyPublicationsService) {
    this.billboardSharedService.getUpdateNew().subscribe((data: any) => {
      this.infoArticle = data;
      this.idArticle = data.id;
      this.numberComments = data.total_comments;
      this.viewModal = true;
      this.myPublicationService.getArticles(this.idArticle).subscribe((res: any) => {
        this.commentsList = res.data.comments_articles;
      })
    })

    this.alert.getActionConfirm().subscribe((data: any) => {

      if (data == "deleteComment") {
        this.myPublicationService.deleteComment(this.idComment,this.idArticle)
          .subscribe((data: any) => {
            if(data.success == true){
            this.alertWarning = [{
              type: 'success',
              title: 'Confirmación',
              message: 'Comentario eliminado exitosamente',
              confirmation: false,
              typeConfirmation: ''
            }];
            this.alert.setAlert(this.alertWarning[0]);
            }
          })
      }
    })

  }

  ngOnInit() {

  }

  sendComment() {
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
    this.showSubmit = false;
    this.myPublicationService.postComment(this.idArticle, this.comment)
      .subscribe(
        (data: any) => {
          (<HTMLInputElement>document.getElementsByClassName('buttonCloseComment')[0]).click();
          const alertWarning: Alerts[] = [{ type: 'success', title: 'Solicitud Exitosa', message: 'Comentario cargado éxitosamente', confirmation: false }];
          this.alert.setAlert(alertWarning[0]);
          this.showSubmit = true;
          console.log(data.data[0])
          // this.newComment = data;

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

  deleteComment(commentObject: any) {
    
    this.alertWarning = [{
      type: 'warning',
      title: 'Confirmación',
      message: '¿Desea eliminar el comentario?',
      confirmation: true,
      typeConfirmation: 'deleteComment'
    }];
    this.alert.setAlert(this.alertWarning[0]);
    this.idArticle = commentObject.article_id;
    this.idComment   = commentObject.id;
    console.log(commentObject)
  }

  editComment(commentObject: any){

  }
  collapse(is_collapse: boolean) {
    this.is_collapse = is_collapse;
  }


}
