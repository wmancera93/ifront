import { Component, OnInit } from '@angular/core';
import { EditArticleService } from '../../../../services/shared/common/edit-article/edit-article.service';
import { MyPublicationsService } from '../../../../services/billboard/my-publications/my-publications.service';
import { FileUploader } from 'ng2-file-upload';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.css']
})
export class EditPublicationComponent implements OnInit {

  public idEdit: any;
  public infoMyPublication : any;
  public showSubmit: boolean = true;
  public title : string;
  public summary : string;
  public body : any;
  public tags : any;
  public image : string;
  ngForm: FormGroup;

  constructor(public EditSharedService: EditArticleService, 
    private fb: FormBuilder,
    public editMyPublicationService:MyPublicationsService) {

      this.getEditArticle();   

      this.ngForm = this.fb.group({
        'title': [this.title],
        'summary': [this.summary],
        'body': [this.body],
        'tags': [this.tags],
        'image': ['']
      });
 
  }

  ngOnInit() {

  }

  getEditArticle(){
    this.EditSharedService.getEditNew().subscribe((data: any) => {
       this.idEdit = data.id;
       this.showEditArticle();
    })
  }

  showEditArticle(){
    this.editMyPublicationService.getArticles(this.idEdit).subscribe((res:any)=>{
      this.infoMyPublication = res.data;
      this.title = this.infoMyPublication.title;
      console.log(res)
    })
    document.getElementById('btn_editNew').click();
    document.getElementById("bodyGeneral").removeAttribute('style');

  }

  

}
