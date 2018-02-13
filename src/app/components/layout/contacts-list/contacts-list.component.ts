import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
Contacts: any=[];
Chats: any=[];

  constructor() {
   
    this.Contacts[0]={name:"Laura",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180212T204032Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=712bcdb84684eefe46ea9260507b1b9ad7101252ede840142084e6ec6dbb80e7",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[1]={name:"Wilmer",photo:"../../../Pictures/ProfilePhoto.jpg",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[2]={name:"Juan",photo:"../../../Pictures/ProfilePhoto.jpg",stars:false,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[3]={name:"Nicolas",photo:"../../../Pictures/ProfilePhoto.jpg",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[4]={name:"Alexis",photo:"../../../Pictures/ProfilePhoto.jpg",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[5]={name:"Enrique",photo:"../../../Pictures/ProfilePhoto.jpg",stars:false,info:"Información del contacto",date:"hoy, 3:40 pm"};
   
    this.Chats[0]={name:"Laura",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180212T204032Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=712bcdb84684eefe46ea9260507b1b9ad7101252ede840142084e6ec6dbb80e7",conver: "Hola", status: "Active" }
    this.Chats[1]={name:"Wilmer",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180212T204032Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=712bcdb84684eefe46ea9260507b1b9ad7101252ede840142084e6ec6dbb80e7",conver: "Hola", status: "Active" }
    this.Chats[2]={name:"Juan",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180212T204032Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=712bcdb84684eefe46ea9260507b1b9ad7101252ede840142084e6ec6dbb80e7",conver: "Hola", status: "Active" }
  }

  ngOnInit() {
  }

}
