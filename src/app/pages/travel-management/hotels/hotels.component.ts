import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../services/shared/common/file-upload/file-upload.service';
import { FormDataService } from '../../../services/common/form-data/form-data.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  public objectImg: any[] = [];
  prueba: any;
  public filequotation = 'fileQuotationTravel';
  public extensions = '.gif, .png, .jpeg, .jpg, .doc, .pdf, .docx, .xls';

  constructor(public fileUploadService: FileUploadService, public formDataService: FormDataService) {

    this.fileUploadService.getObjetFile().subscribe((data) => {
      this.objectImg.push(data)
      setTimeout(() => {
        this.fileUploadService.setCleanUpload(true);
      }, 1000);
    });

  }

  ngOnInit() {

  }

  guardar(model: any) {
    let traverlsObject: any[] = [
      { transport_id: 1, origin_location_id: 3, origin_terminal_id: 1, hotel_id: 82, destination_location_id: 14, destination_terminal_id: 4, origin_datetime: "2018-07-16 18:13:09", destination_datetime: "2018-07-16 22:12:09" },
      { transport_id: 1, origin_location_id: 14, origin_terminal_id: 4, hotel_id: null, destination_location_id: 3, destination_terminal_id: 1, origin_datetime: "2018/07/16 22:13:09", destination_datetime: "2018-07-16 23:13:09" }
    ];

    const modelFromdata = new FormData();
    modelFromdata.append('travel_request_type_id', '1');
    modelFromdata.append('travel_types', '1');
    modelFromdata.append('travels', JSON.stringify(traverlsObject));
    modelFromdata.append('files_length', model.length.toString());
    for (let index = 0; index < model.length; index++) {
      modelFromdata.append('files_' + (index + 1).toString(), model[index]);
    }

    this.formDataService.postTest(modelFromdata).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      })

    let files: any = { type: 1, city: 1, files: model }
    console.log(traverlsObject);
    // console.log(modelFromdata);
  }

}
