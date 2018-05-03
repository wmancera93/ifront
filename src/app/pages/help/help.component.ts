import { Component, OnInit } from '@angular/core';
import { Help } from '../../models/common/help/help';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
 
  public dataHelp : Help[]=[] ;
  
  constructor() { }

  ngOnInit() {
    this.dataHelp = [{title:"Dashboard", image:"", description:"Funcionamiento Dashboard"}, 
    {title:"Organigrama", image:"", description:"Funcionamiento Organigrama"},
    {title:"Mis datos", image:"", description:"Funcionamiento Mis datos"}];
  }

}
