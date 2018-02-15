import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
Contacts: any=[];
Chats: any=[];
statusItem : string;


  constructor() {
   
    this.Contacts[0]={name:"Laura",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[1]={name:"Wilmer",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[2]={name:"Juan",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",stars:false,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[3]={name:"Nicolas",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[4]={name:"Alexis",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[5]={name:"Enrique",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",stars:false,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[6]={name:"Alexis",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",stars:true,info:"Información del contacto",date:"hoy, 3:40 pm"};
    this.Contacts[7]={name:"Enrique",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",stars:false,info:"Información del contacto",date:"hoy, 3:40 pm"};
    
    this.Chats[0]={name:"Laura",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",conver: "Hola", status: false};
    this.Chats[1]={name:"Wilmer",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",conver: "Hola", status: true };
    this.Chats[2]={name:"Laura",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",conver: "Hola", status: false };
    this.Chats[3]={name:"Wilmer",photo:"https://dev-cloud-ihr.s3.amazonaws.com/uploads/employee/image/1534/perfil.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAITTHOW2J2HFQ5LEA%2F20180214%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180214T142705Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=b37fe88b802163e092122de7e05fe1a1ea117dcca3aa0f6027d76e2ae9c87e9d",conver: "Hola", status: false };
    
  }

  ngOnInit() {
  }


}
