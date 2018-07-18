import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TablesPermisions } from '../../../models/common/tables/tables';
import { Angular2TokenService } from 'angular2-token';
import { QueriesService } from '../../../services/queries/queries.service';
import { DataDableSharedService } from '../../../services/shared/common/data-table/data-dable-shared.service';

@Component({
  selector: 'app-historical-posts',
  templateUrl: './historical-posts.component.html',
  styleUrls: ['./historical-posts.component.css']
})
export class HistoricalPostsComponent implements OnInit {

  public objectReport: EventEmitter<any> = new EventEmitter();
  public nameReport: string = 'Histórico de Puestos';
  public token: boolean;
  public showExcel: boolean = true;

  @Output() objectToken: EventEmitter<any> = new EventEmitter();

  constructor(public queriesService: QueriesService,
    private tokenService: Angular2TokenService,
    private accionDataTableService: DataDableSharedService) {
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
    this.accionDataTableService.getActionDataTable().subscribe((data) => {
      if (data === "Histórico de Puestos") {
        this.queriesService.getHistoricalPositionExcel().subscribe((info: any) => {
          let urlSplit = info.url.split('/')[info.url.split('/').length - 2] + '/' + info.url.split('/')[info.url.split('/').length - 1];
          this.tokenService.get(urlSplit).subscribe((url: any) => {
            window.open(url.url);
          })

        })
      }
    });
    this.queriesService.getHistoricalPosts()
      .subscribe((data: any) => {
        this.objectReport.emit(data);

      });
  }


}