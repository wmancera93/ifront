import { Component, OnInit, Input } from '@angular/core';
import { Newspaper } from '../../../../models/common/widgets/widgets';
import { BillboardService } from '../../../../services/shared/common/billboard/billboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.css']
})
export class NewspaperComponent implements OnInit {
  @Input('newspaper') newspaper: any;
  public objectWidget: Newspaper[]=[];

  constructor(public billboardSharedService:BillboardService,public router: Router) { }

  ngOnInit() {
    this.newspaper.subscribe((data: Newspaper[]) => {
      this.objectWidget = data
    })
  }

  viewDetailArticle(objectArticle:any)
  {   
    
    document.getElementById("loginId").style.display = 'block'
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden"); 
    this.billboardSharedService.setUpdateNew(objectArticle);
    setTimeout(() => {
      document.getElementById("loginId").style.display = 'none'
      document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:auto");
    }, 1000)
  }

  

}
