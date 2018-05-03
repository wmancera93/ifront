import { Component, OnInit, Input } from '@angular/core';

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
  
  constructor() { }

  ngOnInit() {
    this.nameModal.subscribe((data: any) => {
      this.targetModal = '#' + data;
      this.btnModal = 'btn-' + data;
      this.nameThisModal = data;
    })
  }
  getShowInfo(modal?: any)
  {
     if (document.getElementById(modal).className !== 'modal show') {
       document.getElementById('btn-' + modal).click();
       document.getElementById("bodyGeneral").removeAttribute('style');
     }
 
   }

}
