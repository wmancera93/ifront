import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ManagerialDataService } from '../../../services/shared/common/managerial-data/managerial-data.service';
import { debug } from 'util';

@Component({
  selector: 'app-gerencial-modal',
  templateUrl: './gerencial-modal.component.html',
  styleUrls: ['./gerencial-modal.component.css']
})
export class GerencialModalComponent implements OnInit {

  @Input('nameModal') nameModal: any;


  public targetModal: string = '';
  public btnModal: string = '';
  public nameThisModal: string = '';
  public dataManagerial: any ;
  public objectDatatable: EventEmitter<any> = new EventEmitter();
  public nameManagerial: string ;
  public titleDataManagerial: string;

  constructor(public mangerialDataShared: ManagerialDataService) {
    this.mangerialDataShared.getDataManagerial().subscribe((dataM: any) => {      
      this.dataManagerial = dataM.objectInfo;
            this.titleDataManagerial = this.dataManagerial.data[0].title;
      if (this.dataManagerial.data[0].data.length > 0) {

        this.nameManagerial = this.dataManagerial.data[0].title;
        this.objectDatatable.emit(this.dataManagerial);
      }

      else {
        this.nameManagerial = this.dataManagerial.data[0].title;
        this.objectDatatable.emit(this.dataManagerial);
      }
      this.getShowInfo(dataM.modal);
    })
  }

  ngOnInit() {
    this.nameModal.subscribe((data: any) => {
      this.targetModal = '#' + data;
      this.btnModal = 'btn-' + data;
      this.nameThisModal = data;
    })
  }
  getShowInfo(modal?: any) {
    if (document.getElementById(modal).className !== 'modal show') {
      document.getElementById('btn-' + modal).click();
      document.getElementById("bodyGeneral").removeAttribute('style');
    }

  }

}
