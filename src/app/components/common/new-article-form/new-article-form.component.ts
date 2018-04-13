import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CKEditorModule } from 'ng2-ckeditor';
import { MyPublicationsService } from '../../../services/billboard/my-publications/my-publications.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions } from '@angular/http';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-new-article-form',
  templateUrl: './new-article-form.component.html',
  styleUrls: ['./new-article-form.component.css']
})
export class NewArticleFormComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  public title: string;
  public resume: string;
  public themes: string[];
  public notice: string;
  public image: string;

  myForm: FormGroup;
  fileToUpload: File = null;
  

  constructor(public createArticleService: MyPublicationsService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'title': [''],
      'summary':[''],
      'body': [''],
      'tags':[''],
      'image': ['']
    });
  }

  ngOnInit() {

  }

  onSubmit(value: any): void{
    console.log(this.uploader)
    value.image = JSON.stringify(this.uploader.queue[0].file);
    console.log(value)
    console.log(JSON.stringify(value))
    // this.createArticleService.sendDataNotice(value).subscribe((data:any)=>{
    //   console.log(data)
    // })
  }






}
