import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TablesPermisions } from '../../../models/common/tables/tables';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';

@Component({
  selector: 'app-historical-posts',
  templateUrl: './historical-posts.component.html',
  styleUrls: ['./historical-posts.component.css']
})
export class HistoricalPostsComponent implements OnInit {
  
  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Historico de Puestos';
  public token: boolean;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public queriesService : QueriesService ,
    private tokenService: Angular2TokenService) {
    this.tokenService.validateToken()
      .subscribe(
        (res) => {
          this.token = false;
        },
        (error) => {
          this.objectToken.emit({
            title: error.status.toString(),
            message: error.json().errors[0].toString()
          });
          document.getElementsByTagName("body")[0].setAttribute("style", "overflow-y:hidden");
          this.token = true;
        })
  }


  ngOnInit() {
    window.scroll({
      top: 1,
      left: 0,
      behavior: 'smooth'
    });
    this.queriesService .getHistoricalPosts()
      .subscribe((data: any) => {
        this.objectReport.emit(data);

      });
  }


}