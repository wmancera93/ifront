import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/general/user';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
/*public InfoContacts: Employee={email: '',
  pernr: 0,
  image: ,
  posicion: '',
  short_name: '', 
  id:0,
  name: '',
  lastname: (''),
  name_complete:  (''),
  favorite:true,
  phone:0,
  unidad_org:  (''),
  area:  (''),
  division_per: (''),
  subdivision_per:  (''),
  fecha_nac: 0,
  fecha_ing: 0,
  personal_phone:0,
  contract_type: (''),
  address:('')};
*/
Contacts: any=[];
Chats: any=[];
statusItem : string;


  constructor() {
   
    this.Contacts[0]={name:"Laura",photo:"../../../assets/themes/patterns/icon-user-negative.png",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[1]={name:"Wilmer",photo:"../../../assets/themes/patterns/icon-user-negative.png",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[2]={name:"Juan",photo:"../../../assets/themes/patterns/icon-user-negative.png",stars:false,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[3]={name:"Nicolas",photo:"../../../assets/themes/patterns/icon-user-negative.png",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[4]={name:"Alexis",photo:"../../../assets/themes/patterns/icon-user-negative.png",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[5]={name:"Enrique",photo:"../../../assets/themes/patterns/icon-user-negative.png",stars:false,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[6]={name:"Alexis",photo:"../../../assets/themes/patterns/icon-user-negative.png",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[7]={name:"Enrique",photo:"../../../assets/themes/patterns/icon-user-negative.png",stars:false,info:"Información del contacto",date:"hoy, 3:40 pm"};
    
    this.Chats[0]={name:"Laura",photo:"../../../assets/themes/patterns/icon-user-negative.png",conver: "Hola", status: true};
    this.Chats[1]={name:"Wilmer",photo:"../../../assets/themes/patterns/icon-user-negative.png",conver: "Hola", status: true };
    this.Chats[2]={name:"Laura",photo:"../../../assets/themes/patterns/icon-user-negative.png",conver: "Hola", status: false };
    this.Chats[3]={name:"Wilmer",photo:"../../../assets/themes/patterns/icon-user-negative.png",conver: "Hola", status: true };
    
  }

  ngOnInit() {
  }


}
