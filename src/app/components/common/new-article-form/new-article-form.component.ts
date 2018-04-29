import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CKEditorModule } from 'ng2-ckeditor';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions } from '@angular/http';
import { AlertsService } from '../../../services/shared/common/alerts/alerts.service';
import { Alerts } from '../../../models/common/alerts/alerts';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { BillboardService } from '../../../services/shared/common/billboard/billboard.service';
import { EditArticleService } from '../../../services/shared/common/edit-article/edit-article.service';

const formData = new FormData();

@Component({
  selector: 'app-new-article-form',
  templateUrl: './new-article-form.component.html',
  styleUrls: ['./new-article-form.component.css']
})
export class NewArticleFormComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public title: string;
  public resume: string;
  public themes: string[];
  public notice: string;
  public image: string;
  public uploadListNews: boolean;
  public extensions: string = '.gif, .png, .jpeg, .jpg ';
  public fileImageNew: string = 'fileImageNew';
  public showSubmit: boolean = true;

  formNewArticle: FormGroup;
  fileToUpload: File = null;


  constructor(public createArticleService: MyPublicationsService,
    private fb: FormBuilder,
    public alert: AlertsService,
    public fileUploadService: FileUploadService,
    public billboardSharedService: BillboardService,
    public editEditSharedService: EditArticleService) {

    this.fileUploadService.getObjetFile().subscribe((data: any) => {
      this.image = data;
    })
    this.formNewArticle = this.fb.group({
      'title': [''],
      'summary': [''],
      'body': [''],
      'tags': [''],
      'image': ['']
    });
  }

  ngOnInit() {
    //document.getElementsByClassName('ng2-tag-input__text-input')[0].setAttribute('style', 'height:20px !important; ');

  }
  onSubmitNewArticle(value: any): void {
    this.showSubmit = false;
    const selectedItems = value.tags.map(({ display }) => display);
    let newArticleForm = new FormData();
    newArticleForm.append('title', value.title);
    newArticleForm.append('summary', value.summary);
    newArticleForm.append('body', value.body);
    newArticleForm.append('tags', selectedItems);
    newArticleForm.append('image', this.image);
    (<HTMLInputElement>document.getElementsByClassName('buttonCloseForm')[0]).click();
    const alertConfirmation: Alerts[] = [{ type: 'success', title: 'Estado de la noticia', message: 'Noticia guardada' }];
    this.alert.setAlert(alertConfirmation[0]);
    this.createArticleService.sendDataNotice(newArticleForm).subscribe((data: any) => {
      if (data.success == true) {
        this.showSubmit = true;
        this.uploadListNews = true;
        this.billboardSharedService.setUpdateNew(this.uploadListNews);
      }
    })
  }


}









